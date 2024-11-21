import type {EntryContext} from '@remix-run/node'
import {PassThrough} from 'node:stream'
import {RemixServer} from '@remix-run/react'
import {createReadableStreamFromReadable} from '@remix-run/node'
import {renderToStaticMarkup, renderToPipeableStream} from 'react-dom/server'
import {
  createDOMRenderer,
  RendererProvider,
  renderToStyleElements,
  SSRProvider
} from '@fluentui/react-components'
import {isbot} from 'isbot'

const ABORT_DELAY = 5000

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const renderer = createDOMRenderer()
  const callbackName = isbot(request.headers.get('user-agent'))
    ? 'onAllReady'
    : 'onShellReady'

  return new Promise((resolve, reject) => {
    let shellRendered = false
    let isStyleExtracted = false

    const {pipe, abort} = renderToPipeableStream(
      <RendererProvider renderer={renderer}>
        <SSRProvider>
          <RemixServer context={remixContext} url={request.url} />
        </SSRProvider>
      </RendererProvider>,
      {
        [callbackName]: () => {
          shellRendered = true
          const body = new PassThrough({
            transform(chunk, _, callback) {
              const str: string = chunk.toString()
              // Converting Fluent UI styles to style elements. 👇
              const style = renderToStaticMarkup(
                <>{renderToStyleElements(renderer)}</>
              )

              if (!isStyleExtracted) {
                if (str.includes('__STYLES__')) {
                  // Apply Fluent UI styles to markup.
                  chunk = str.replace('__STYLES__', style)
                  isStyleExtracted = true
                }
              }

              callback(null, chunk)
            }
          })
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          responseStatusCode = 500
          if (shellRendered) {
            console.error(error)
          }
        }
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

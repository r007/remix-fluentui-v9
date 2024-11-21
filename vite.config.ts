import {resolve} from 'path'
import {vitePlugin as remix} from '@remix-run/dev'
import {defineConfig} from 'vite'
import {cjsInterop} from 'vite-plugin-cjs-interop'

export default defineConfig({
  ssr: {
    noExternal: ['@fluentui/react-icons']
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true
      }
    }),
    cjsInterop({
      // List of CJS dependencies that require interop
      dependencies: [
        '@fluentui/react-components',
        '@fluentui/react-nav-preview',
        '@fluentui/react-list-preview',
        '@fluentui/react-virtualizer',
        '@fluentui/react-motion-components-preview'
      ]
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './app')
    }
  },
  server: {
    port: 3000
  }
})

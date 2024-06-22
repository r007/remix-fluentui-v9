import {Links, Meta, Outlet, Scripts, ScrollRestoration} from '@remix-run/react'
import {FluentProvider, webLightTheme} from '@fluentui/react-components'

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

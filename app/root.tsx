import {Links, Meta, Outlet, Scripts, ScrollRestoration} from '@remix-run/react'
import {FluentProvider, webLightTheme} from '@fluentui/react-components'

const isBrowser = () => {
  return (
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {!isBrowser() && '__STYLES__'}
      </head>
      <body>
        {/* 👇 Apply fluent theme to children */}
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

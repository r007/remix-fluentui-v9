# Fluent UI v9 / Remix starter

This is a pretty basic setup, with no frills. It uses a classic remix compiler and not `vite`. The vite compiler has some issues with `@fluentui/react-icons`, it throws an error `unexpected token 'export'`. If you have an idea on how to fix it, create a new PR.

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

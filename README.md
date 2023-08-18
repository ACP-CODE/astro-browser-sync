# [astro-browser-sync] 🌎

Add BrowserSync in your Astro project.

```bash
yarn run v1.22.19
$ astro dev
  🚀  astro  v2.10.3 started in 3094ms
  
  ┃ Local    http://localhost:3000/
  ┃ Network  use --host to expose
  
23:43:06 [astro-browser-sync] initiated in 6797ms
23:43:06 [astro-browser-sync] Local http://localhost:4000
23:43:06 [astro-browser-sync] UI http://localhost:4001
```

## Usage

```bash
npm i astro-browser-sync -D
```

If you want to manage BrowserSync or override default behavior of this integration, you can pass a `browserSyncOptions` object with your [BrowserSync options](https://browsersync.io/docs/options) in it :

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";
import broswerSync from 'astro-browser-sync'

export default defineConfig({
    //....
   integrations: [
      // Default Config
      browserSync({
        mode: 'verbose',
        browserSyncOptions: {
          port: 4000,
          open: true,
          ui: {
            port: 4001,
          },
          notify: true,
        }
      }),
   ]
})
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.
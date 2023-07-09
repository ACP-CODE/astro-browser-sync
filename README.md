# [astro-browser-sync] 🌎

Add [BrowserSync](https://browsersync.io) in your Astro project.

> This plugin supports Astro 2.0 and Above.


## Usage

BrowserSync starts alongside your Astro Server. By default, it uses the `proxy` mode of BrowserSync based on your Astro server options : no need to pass any options to make it work !

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import BroswerSync from 'astro-browser-sync'

export default defineConfig({
    //....
   integrations: [
        BrowserSync(),
   ]
   //...
})
```


If you want to manage BrowserSync or `override default behavior of this integration`, you can pass a `bs` object with your [BrowserSync options](https://browsersync.io/docs/options) in it :

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import broswerSync from 'astro-browser-sync'

export default defineConfig({
    //....
   integrations: [
        browserSync({
            mode: 'proxy' // proxy: default | snippet
            bs: { 
                port: 4000, // default `4000`
                ui: { port: 4040 }, // default `8000`
                notify: false, // default `true`
                open: true, // default `true`
            },
        }),
   ]
   //...
})
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.
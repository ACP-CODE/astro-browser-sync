import type { AstroConfig, AstroIntegration } from 'astro';

import browserSync from 'browser-sync';
import { packageName } from './data/pkg-name';

import measureExecutionTime from './utils/measureExecutionTime';

export interface PluginConfig {
  /**
  * @default `verbose`
  * @description
  * Show or hide log of integration
  */
  mode?: 'verbose' | 'quiet';
  /**
   * @default
   * ```js
   * broswerSyncOptions: {
   *  port: 4000,
   *  open: true,
   *  ui: { port: 4001 },
   *  logLevel: 'silent',
   *  notify: true,
   * }
   * ```
   * @description
   * For more configuration options, please refer to the Browsersync Options at https://browsersync.io/docs/options for details.
   */
  browserSyncOptions?: Partial<browserSync.Options>;
}

const defaultConfig: PluginConfig = {
  mode: 'verbose',
  browserSyncOptions: {
    port: 4000,
    open: true,
    ui: {
      port: 4001,
    } as Partial<browserSync.UIOptions>,
    logLevel: 'silent',
    notify: true,
  }
}

function colorGray(text: string) {
  return `\x1b[2m${text}\x1b[22m`
}

let executionTime: number;
let IsRestart: boolean;
let config: AstroConfig;
let command: "dev" | "build" | "preview";

export default function createBrowserSyncIntegration(astroConfig: PluginConfig): AstroIntegration {

  const server = browserSync.create();

  const mergedConfig = { ...defaultConfig, ...astroConfig }
  const colorPKGName = `\x1b[1m\x1b[36m[${packageName}]\x1b[0m`;

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const time = colorGray(`${hours}:${minutes}:${seconds}`)

  function serverInit() {
    server.init(
      {
        ...mergedConfig?.browserSyncOptions,
        proxy: `http://localhost:${config.server.port}`,
        logPrefix: packageName,
        open: !IsRestart,
      },
      logInfo
    );
  }

  function logInfo() {
    if (mergedConfig.mode !== 'quiet') {
      const uiPort = (mergedConfig?.browserSyncOptions?.ui as browserSync.UIOptions)?.port
      console.log(`${time} ${colorPKGName} \x1b[32mInitiated\x1b[0m in ${executionTime}ms.`);
      console.log(`${time} ${colorPKGName} Local \x1b[35mhttp://localhost:${mergedConfig?.browserSyncOptions?.port}\x1b[0m`);
      console.log(`${time} ${colorPKGName} UI \x1b[35mhttp://localhost:${uiPort}\x1b[0m`);
    }
  }

  return {
    name: packageName,
    hooks: {
      'astro:config:setup': ({ config: cfg, command: cmd, isRestart: ir }) => {
        config = cfg;
        IsRestart = ir;
        command = cmd;
      },
      'astro:server:start': async () => {
        if (command !== 'build') {
          executionTime = measureExecutionTime(serverInit);
        }
      },
      'astro:server:done': () => {
        server.exit();
      },
    },
  };
}

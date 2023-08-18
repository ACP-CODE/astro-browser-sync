import type { AstroConfig, AstroIntegration } from 'astro';

import browserSync from 'browser-sync';
import { packageName } from './data/pkg-name';

export interface PluginConfig {
	/**
	* @docs
	* @name svgSprite.mode
	* @default `verbose`
	* @description
	* Show or hide log of integration
	*/
	mode?: 'verbose' | 'quiet';
	/**
	 * @docs
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

export default function createBrowserSyncIntegration(astroConfig: PluginConfig): AstroIntegration {
	const startTime = process.hrtime();
	const server = browserSync.create();
	const mergedConfig = { ...defaultConfig, ...astroConfig }
	const colorPKGName = `\x1b[1m\x1b[36m[${packageName}]\x1b[0m`;

	const now = new Date();
	const hours = now.getHours().toString().padStart(2, '0');
	const minutes = now.getMinutes().toString().padStart(2, '0');
	const seconds = now.getSeconds().toString().padStart(2, '0');
	const time = `\x1b[38;2;169;169;169m${hours}:${minutes}:${seconds}\x1b[0m`

	return {
		name: packageName,
		hooks: {
			'astro:config:setup': ({ config, command, isRestart }) => {
				if (command !== 'build') {
					server.init(
						{
							...mergedConfig?.browserSyncOptions,
							proxy: `http://localhost:${config.server.port}`,
							logPrefix: colorPKGName,
							open: !isRestart,
						},
						function (err) {
							if (mergedConfig.mode !== 'quiet') {
								const endTime = process.hrtime(startTime);
								const executionTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);
								const uiPort = (mergedConfig?.browserSyncOptions?.ui as browserSync.UIOptions)?.port
								console.log(`${time} ${colorPKGName} \x1b[32minitiated\x1b[0m in ${executionTime}ms`);
								console.log(`${time} ${colorPKGName} Local \x1b[35mhttp://localhost:${mergedConfig?.browserSyncOptions?.port}\x1b[0m`);
								console.log(`${time} ${colorPKGName} UI \x1b[35mhttp://localhost:${uiPort}\x1b[0m`);
							}
						}
					);
				}
			},
			'astro:server:done': () => {
				server.exit();
			},
		},
	};
}

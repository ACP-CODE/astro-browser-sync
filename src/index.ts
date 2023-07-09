import type { AstroIntegration } from 'astro';
import browserSync from 'browser-sync';

const server = browserSync.create();

import { defaultOptions, snippetDefaultOptions } from './options';
import type { Options } from './options';

export default function BrowserSync(opts: Options): AstroIntegration {
	return {
		name: 'astro-broswer-sync',
		hooks: {
			'astro:config:setup': ({ command, isRestart, config }) => {
				const _proxy = `http://localhost:${config.server.port}`;
				if ((command === 'dev' || command === 'preview') && !isRestart && opts?.mode !== 'snippet') {
					server.init({
						proxy: _proxy,
						...defaultOptions,
						...opts?.bs,
					});
				} else if ((command === 'dev' || command === 'preview') && !isRestart) {
					server.init({
						proxy: _proxy,
						...defaultOptions,
						...opts?.bs,
						snippet: true,
						snippetOptions: {
							...snippetDefaultOptions,
							...opts?.bs?.snippetOptions,
						}
					})
				}

			},
		},
	};
}

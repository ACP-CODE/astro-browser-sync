import browserSync from 'browser-sync';

type OptionsType = 'snippet' | 'proxy';

export interface Options {
	mode?: OptionsType;
	bs?: browserSync.Options;
}

export const defaultOptions = {
	port: 4000,
	ui: {
		port: 4040,
	},
	open: true,
	logLevel: 'silent',
	notify: true,
}

export const snippetDefaultOptions = {
	/**
	 * Reference
	 * https://browsersync.io/docs/options#option-snippetOptions
	 */
	rule: {
		match: /<\/body>/i,
		fn: function (snippet: any, match: any) {
			return snippet + match;
		},
	},
	whitelist: ['*.html', '*.css', '*.js'],
	async: true,
}
import type { AstroIntegration } from 'astro';
import browserSync from 'browser-sync';

type OptionsType = 'snippet' | 'proxy';

export type Options = {
    mode?: OptionsType;
    bs?: browserSync.Options;
}

declare const BrowserSync: (options?: Options) => AstroIntegration;
export { BrowserSync as default };
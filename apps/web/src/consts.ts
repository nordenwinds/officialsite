// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
import type { MenuItem } from './components/Header.astro';

export const SITE_TITLE = 'My personal website.';
export const SITE_DESCRIPTION = 'Welcome to my website!';

export const MENU_ITEMS = [
    { text: 'お知らせ', link: '#information' },
    { text: 'コンサート', link: '#concert' },
    { text: '私たちについて', link: '#about-us' },
    { text: 'お問い合わせ', link: '#contact' },
] satisfies MenuItem[];

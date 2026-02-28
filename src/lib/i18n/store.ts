import { writable } from 'svelte/store';
import type { Locale } from './t';

export const activeLocale = writable<Locale>('en');

import { writable } from 'svelte/store';

export const selectedItem = writable(null);
export const isModalOpen = writable(false);

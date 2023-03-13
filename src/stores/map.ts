import { writable } from 'svelte/store';

export const googleMapStore = writable<google.maps.Map | null>(null);
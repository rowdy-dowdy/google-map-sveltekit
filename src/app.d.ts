// See https://kit.svelte.dev/docs/types#app

import type { InfoWindow } from "$lib/components/info_window";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
  interface Window {
    initMap: () => void;
    map: google.maps.Map,
  }
  // interface HTMLElementTagNameMap {
  //   "info-window": InfoWindow;
  // }
}

export {};

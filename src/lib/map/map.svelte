<script lang="ts">
	import L, { type LatLngExpression } from 'leaflet';
  import "leaflet-routing-machine"
	import MapToolbar from './map_toolbar.svelte';
	import MarkerPopup from './map_popup.svelte';
  import "$lib/web_components/info_window";
  import { onMount } from 'svelte';
  
	let map: L.Map;
	
	const markerLocations = [
		[21.584593, 105.811771],
	];
	
	const initialView: LatLngExpression = [21.584593, 105.811771];
	function createMap(container: any) {
	  let m = L.map(container, {preferCanvas: true }).setView(initialView, 10);
    L.tileLayer(
	    // 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      // 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	  ).addTo(m);

    return m;
  }
	
	let toolbar = (L as any).control({ position: 'bottomright' });
	let toolbarComponent: any
	toolbar.onAdd = (map: L.Map) => {
		let div = L.DomUtil.create('div');
		toolbarComponent = new MapToolbar({
			target: div,
			props: {}
		});

		toolbarComponent.$on('current', ({detail}: any) => {
      if (detail) {
        map.setView([detail.lat, detail.lng], map.getZoom(), { animate: true, duration: 1 });
      }
		})

		return div;
	}

	toolbar.onRemove = () => {
		if(toolbarComponent) {
			toolbarComponent.$destroy();
			toolbarComponent = null;
		}
	};
	
	// Create a popup with a Svelte component inside it and handle removal when the popup is torn down.
	// `createFn` will be called whenever the popup is being created, and should create and return the component.
	function bindPopup(marker: any, createFn: any) {
		let popupComponent: any;
		marker.bindPopup(() => {
			let container = L.DomUtil.create('div');
			popupComponent = createFn(container);
			return container;
		});

		marker.on('popupclose', () => {
			if(popupComponent) {
				let old = popupComponent;
				popupComponent = null;
				// Wait to destroy until after the fadeout completes.
				setTimeout(() => {
					old.$destroy();
				}, 500);

			}
		});
	}
	
	let markers = new Map();
	
	function markerIconHtml(count: number) {
		let html = `<img src="https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png" />`;
		return L.divIcon({
			html,
			className: 'map-marker'
		});
	}

  let LeafIcon: any = L.Icon.extend({
    options: {
      iconSize: [30, 30],
    }
  });
	

	function createMarker(loc: any) {
		let count = Math.ceil(Math.random() * 25);
		let icon = new LeafIcon({iconUrl: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png'})
		let marker = L.marker(loc, {icon});
		bindPopup(marker, (m: Element) => {
			let c = new MarkerPopup({
				target: m,
				props: {
					count
				}
			});
			
			// c.$on('change', ({detail}) => {
			// 	count = detail;
			// 	marker.setIcon(markerIcon(count));
			// });
			
			return c;
		});
		
		return marker;
	}

	let markerLayers;
	let lineLayers: any;
  function mapAction(container: any) {
    map = createMap(container); 
		toolbar.addTo(map);
		
		markerLayers = L.layerGroup()
 		for(let location of markerLocations) {
 			let m = createMarker(location);
			markerLayers.addLayer(m);
 		}
		
		// markerLayers.addTo(map);

    L.Routing.control({
      waypoints: [
        map.getCenter(),
        L.latLng(21.584593, 105.911771)
      ],
      // router: L.Routing.osrmv1({
      //   serviceUrl: 'http://my-osrm/route/v1'
      // })
      routeWhileDragging: true,
      draggableWaypoints: false,
      createMarker: function (i: number, waypoint: any, n: number) {
        const marker = L.marker(waypoint.latLng, {
          icon: L.icon({
            iconUrl: 'marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [10, 40],
          })
        });
        return marker;
      },
      language: 'vi'
    } as any)
    .on('routesfound', function(e) {
      var routes: L.Routing.IRoute[] = e.routes;
      console.log(routes[0].instructions)
    })
    .addTo(map);
		
    return {
      destroy: () => {
				toolbar.remove();
				map.remove();
				map = null as any;
			}
    };
	}

	function resizeMap() {
	  if(map) { map.invalidateSize(); }
  }

  onMount(() => {
    setTimeout(() => {
      map.setView(initialView, 12, { 
        animate: true, 
        duration: 2,
        easeLinearity: 1
      })
    }, 500);
  })
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
</svelte:head>

<svelte:window on:resize={resizeMap} />

<div class="map" style="height:100%;width:100%" use:mapAction />

<style lang="postcss">
  :global(.leaflet-control-attribution.leaflet-control) {
    @apply !hidden;
  }
</style>
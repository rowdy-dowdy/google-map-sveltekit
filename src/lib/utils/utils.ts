import { browser } from "$app/environment";
import { map as mapStore } from "../../stores/map";
import { get } from 'svelte/store';
import gsap, {Linear} from "gsap"
import "$lib/web_components/info_window";
import { Zoom } from "swiper";

const getLocation = () => {
  return new Promise((res,rej) => {
    if (!navigator.geolocation) rej("Geolocation is not supported by your browser")

    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      res({ lat: latitude, lng: longitude})
    })

    rej("Error")
  })
}

type MoveMapOptionType = {
  position: {
    lat: number,
    lng: number
  },
  zoom?: number,
  duration?: number
}

const moveMap = ({position, zoom = 14, duration = 1} : MoveMapOptionType) => {
  const map = get(mapStore)
  if (!browser || !map) return

  function animate(time?: any) {
    if (time < duration * 1000)
      requestAnimationFrame(animate);
  }

  let center = map.getCenter()
  if (!center) return

  let old = {lat: center.lat(), lng: center.lng(), zoom: map.getZoom() }

  // animation
  gsap.to(old, { 
    lat: position.lat, lng: position.lng, zoom: zoom,
    onUpdate: () => {
      let newVal = {
        lat: old.lat,
        lng: old.lng,
      }
      map.moveCamera({center: newVal, zoom: old.zoom});
    },
    duration: duration,
    ease: Linear.easeNone
    // stagger: {
    //   amount: 3, 
    // }
  });

  animate(0)
}

type PlaceType = {
  id: number;
  slug: string;
  title: string;
  description: string;
  images: string[];
  position: {
      lat: number;
      lng: number;
  };
}

const addMapMaker = (places: PlaceType[]) => {
  const map = get(mapStore)
  if (!browser || !map) return

  const iconBase = "https://developers.google.com/maps/documentation/javascript/examples/full/images/";

  const icons: Record<string, { icon: string }> = {
    parking: {
      icon: iconBase + "parking_lot_maps.png",
    },
    library: {
      icon: iconBase + "library_maps.png",
    },
    info: {
      icon: iconBase + "info-i_maps.png",
    },
  };

  const features = places.map((v: any) => ({
    position: v.position, 
    type: 'info'
  }))

  let markers = []

  // Create markers.
  for (let i = 0; i < features.length; i++) {
    markers[i] = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map,
    });
  }

  const infoWindow = new google.maps.InfoWindow({
    content: `<info-window/>`,
    ariaLabel: "Uluru",
  });

  markers.forEach((v,i) => {
    v.addListener("click", () => {
      let html = `<info-window 
        title="${places[i].title}" 
        description="${places[i].description}" 
        images=${JSON.stringify(places[i].images)}
      />`
      infoWindow.setContent(html)

      infoWindow.open({
        anchor: v,
        map: map,
      });
    });
  })

  google.maps.event.addListener(map, "click", function(event: Event) {
    infoWindow.close();
  });
}

export {
  getLocation,
  moveMap,
  addMapMaker
}
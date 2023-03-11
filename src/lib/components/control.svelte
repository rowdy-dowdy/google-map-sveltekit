<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap"
  import "$lib/web_components/info_window";

  export let map: google.maps.Map;
  export let places: any[]

  let duration = 1

  function animate(time?: any) {
    if (time < duration * 1000)
      requestAnimationFrame(animate);
  }

  const move = () => {
    let center = map.getCenter()
    if (!center) return

    let old = {lat: center.lat(), lng: center.lng() }

    // animation
    gsap.to(old, { 
      lat: 21.594593, lng: 105.811771 , 
      onUpdate: () => {
        let newVal = {
          lat: old.lat,
          lng: old.lng,
        }
        map.moveCamera({center: newVal});
      },
      duration: duration,
    });

    animate(0);
  }

  const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";

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
      console.log(html)
      infoWindow.setContent(html)
      infoWindow.open({
        anchor: v,
        map,
      });
    });
  })

  google.maps.event.addListener(map, "click", function(event: Event) {
    infoWindow.close();
  });
</script>

<button on:click|preventDefault={move}>Move</button>
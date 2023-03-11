<script lang="ts">
  import gsap from "gsap"
  export let map: google.maps.Map;

  // const getLocation = () => {
  //   if (!navigator.geolocation) {
  //     console.log("Geolocation is not supported by your browser");
  //   } else {
  //     console.log("Locating…")
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;

  //       console.log(latitude, longitude)

  //       map.setCenter(new google.maps.LatLng(latitude,longitude))
  //     }, () => {
  //       console.log("Error")
  //     });
  //   }
  // }

  let duration = 1

  function animate(time?: any) {
    if (time < duration * 1000)
      requestAnimationFrame(animate);
    // update(time);
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

    animate();
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

  const features = [
    {
      position: new google.maps.LatLng(21.594593, 105.811771),
      type: "info",
    },
  ];

  let markers = []

  // Create markers.
  for (let i = 0; i < features.length; i++) {
    markers[i] = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map,
    });
  }

  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";

  const infowindow = new google.maps.InfoWindow({
    content: `<InfoWindow />`,
    ariaLabel: "Uluru",
  });

  // const marker = new google.maps.Marker({
  //   position: {lat: 21.594593, lng: 105.811771 },
  //   map,
  //   title: "Uluru (Ayers Rock)",
  // });

  markers.forEach(v => {
    v.addListener("click", () => {
      infowindow.open({
        anchor: v,
        map,
      });
    });
  })

  google.maps.event.addListener(infowindow, "domready", function() {
    // anythingSlider()
    console.log('domready')
  })
  
</script>

<button on:click|preventDefault={move}>Move</button>
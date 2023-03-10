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

  const move = () => {
    let old = {lat: 21.584593, lng: 105.811771 }

    let temp = map.getCenter()
    let temp2 = map.getZoom()
    console.log(temp?.lat(), temp?.lng(), temp2)

    let duration = 1;

    // animation
    gsap.to(old, { 
      lat: 21.594593, lng: 105.811771 , 
      onUpdate: () => {
        let newVal = {
          // tilt: cameraOptions.tilt,
          // heading: cameraOptions.heading,
          lat: old.lat,
          lng: old.lng,
        }
        // console.log(old.)
        map.moveCamera({center: newVal});
      },
      duration: duration,
      // ease: Circ.easeOut
    });

    function animate(time?: any) {
      if (time < duration * 1000)
        window.requestAnimationFrame(animate);
      // update(time);
    }

    animate();
  }
</script>

<button on:click|preventDefault={move}>Move</button>
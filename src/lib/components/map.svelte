<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import gsap from "gsap"

  import mapStyles from '$lib/map/mapStyles'; // optional

  export let globally = true;
  export let map: google.maps.Map

  let src = "";
  const key = "AIzaSyDaOulQACiJzBfqumbsqg_-vKha8fCnL-s";

  // @ts-ignore
  let container: HTMLElement;

  onMount(() => {
    Object.assign(window, {
      mapLoaded: mapLoaded,
    });

    //Assign
    src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=mapLoaded`;
  });

  const mapLoaded = () => {
    // @ts-ignore
    const cameraOptions = {
      tilt: 0,
      heading: 0,
      zoom: 10,
      center: { lat: 21.584593, lng: 105.811771 },
    };

    map = new google.maps.Map(container, {...cameraOptions, styles: mapStyles});

    dispatch("load", true);
    if (globally) {
      Object.assign(window, { map });
    }

    // animation
    let duration = 5;
    
    function animate(time?: any) {
      if (time < duration * 1000)
        window.requestAnimationFrame(animate);
    }

    setTimeout(() => {
      gsap.to(cameraOptions, { 
        zoom: 14, 
        onUpdate: () => {
          console.log(cameraOptions)
          let newVal = {
            // tilt: cameraOptions.tilt,
            // heading: cameraOptions.heading,
            zoom: cameraOptions.zoom,
          }
          map.moveCamera(newVal);
        },
        duration: duration,
        // ease: Circ.easeOut
      });

      animate();
    }, 1000);

  }
</script>

<svelte:head>
  {#if src}
  <script {src}></script>
  {/if}
</svelte:head>

<!-- This is tailwind css class change with whatever fits to your case. -->
<div class="w-full h-full" bind:this={container} />
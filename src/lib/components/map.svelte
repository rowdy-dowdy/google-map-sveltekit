<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import gsap, {Linear} from "gsap"
  import { map as mapStore } from "../../stores/map";

  import mapStyles from '$lib/map/mapStyles'; // optional
  import { awaitMapAnimation } from "../../stores/app";

  export let globally = true;
  export let map: google.maps.Map

  let src = "";
  const key = "AIzaSyDc7PnOq3Hxzq6dxeUVaY8WGLHIePl0swY";

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
    $mapStore = map

    dispatch("load", true);
    if (globally) {
      Object.assign(window, { map });
    }

    // animation
    let duration = 2;

    setTimeout(() => {
      gsap.to(cameraOptions, { 
        zoom: 13, 
        onUpdate: () => {
          let newVal = {
            // tilt: cameraOptions.tilt,
            // heading: cameraOptions.heading,
            zoom: cameraOptions.zoom,
          }
          map.moveCamera(newVal);
        },
        onComplete: () => {
          $awaitMapAnimation = false;
        },
        duration: duration,
        ease: Linear.easeNone
      });
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
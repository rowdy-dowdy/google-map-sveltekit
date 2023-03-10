<script lang="ts">
  import { browser } from "$app/environment";
  import Control from "$lib/components/control.svelte";
  import Map from "../lib/components/map.svelte";
  
  let map: google.maps.Map;
</script>


<div class="w-full h-full flex items-stretch">
  <div class="flex-none w-1/3">
    <Control {map} />
  </div>
  <div class="flex-grow min-w-0">
    <Map 
      bind:map={map}
      globally
      on:load={() => {
      console.log('MAP SAYS IM LOADED');
      }} 
    />
  </div>
</div>
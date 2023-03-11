<script lang="ts">
  import Header from "$lib/components/header.svelte";
  import Map from "$lib/components/map.svelte";
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { addMapMaker } from "$lib/utils/utils";

  let map: google.maps.Map;

  export let data: LayoutData
  let firstAddMapMaker = false

  $: if (map && !firstAddMapMaker) {
    addMapMaker(data.places)
  }

</script>



<div class="flex flex-col w-full h-full">
  <div class="flex-none w-full">
    <Header />
  </div>
  <div class="flex-grow min-h-0">
    <div class="w-full h-full flex items-stretch">
      <div class="flex-none w-1/3 overflow-y-auto">
        <div class="h-full px-4 py-6 bg-gray-100">
          {#if map}
            <slot />
          {/if}
        </div>
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
  </div>
</div>

<style lang="postcss">
  :global(#app) {
    @apply w-full h-screen overflow-auto text-[#333];
  }
</style>
<script lang="ts">
  import Header from "$lib/components/header.svelte";
  import Map from "$lib/components/map.svelte";
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { addMapMaker } from "$lib/utils/utils";
  import Loading from "$lib/components/loading.svelte";
  import Alert from "$lib/components/alert.svelte";
  import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
  import 'simplebar/dist/simplebar.css';

  let map: google.maps.Map;

  export let data: LayoutData
  let firstAddMapMaker = false

  $: if (map && !firstAddMapMaker) {
    addMapMaker(data.places)
  }
</script>

<div class="flex flex-col w-full h-full">
  <div class="flex-none w-full">
    <Header>
      <Loading />
    </Header>
  </div>
  <div class="flex-grow min-h-0">
    <div class="w-full h-full flex items-stretch overflow-hidden">
      <!-- use simplebar -->
      <div data-simplebar class="flex-none w-[500px] bg-gray-50">
        <div class="px-4 py-6">
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

<Alert />

<style lang="postcss">
  :global(#app) {
    @apply w-full h-screen overflow-auto text-[#333];
  }
</style>
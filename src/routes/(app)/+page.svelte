<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap"
  import "$lib/web_components/info_window";
  import type { PageData } from "./$types";
  import { moveMap } from "$lib/utils/utils";
  import { awaitMapAnimation } from "../../stores/app";
  import LazyImage from "$lib/components/lazy_image.svelte";
  export let data

  $: if(!$awaitMapAnimation) {
    moveMap({
      position: { lat: 21.584593, lng: 105.811771 },
      zoom: 13
    })
  }

  onMount(() => {
    if (!$awaitMapAnimation)
      moveMap({
        position: { lat: 21.584593, lng: 105.811771 },
        zoom: 13
      })
  })
</script>

<div class="flex flex-wrap items-stretch -mx-2">
  {#each data.places as place}
    <div class="w-1/2 px-2 mb-4">
      <a href="/{place.slug}" class="h-full shadow bg-white hover:shimmer">
        <div class="relative w-full pb-[75%] bg-gray-200">
          <div class="bg-full">
            <LazyImage src={place.images[0]} alt={place.title} />
          </div>
        </div>
        <div class="bg-white px-2 py-2">
          <div class="flex items-center space-x-2">
            <span class="icon text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.991 2H9.01C7.899 2 7 2.899 7 4.01v5.637l-4.702 4.642A1 1 0 0 0 3 16v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4.009C21 2.899 20.102 2 18.991 2zm-8.069 13.111V20H5v-5.568l2.987-2.949 2.935 3.003v.625zM13 9h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path><path d="M7 15h2v2H7z"></path></svg>
            </span>
            <span class="font-semibold text-sm">{place.title}</span>
          </div>
        </div>
      </a>
    </div>
  {/each}
  <div class="w-1/2 px-2 mb-4">
    <a href="/checke-rror" class="h-full shadow bg-white hover:shimmer">
      <div class="relative w-full pb-[75%] bg-gray-200">
        <div class="bg-full">
          <LazyImage src="" alt="" />
        </div>
      </div>
      <div class="bg-white px-2 py-2">
        <div class="flex items-center space-x-2">
          <span class="icon text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.991 2H9.01C7.899 2 7 2.899 7 4.01v5.637l-4.702 4.642A1 1 0 0 0 3 16v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4.009C21 2.899 20.102 2 18.991 2zm-8.069 13.111V20H5v-5.568l2.987-2.949 2.935 3.003v.625zM13 9h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path><path d="M7 15h2v2H7z"></path></svg>
          </span>
          <span class="font-semibold text-sm">Địa điểm lỗi</span>
        </div>
      </div>
    </a>
  </div>
</div>

<!-- <button on:click|preventDefault={move}>Move</button> -->
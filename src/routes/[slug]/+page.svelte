<script lang="ts">
  import { onMount } from "svelte";
  import { map } from "../../stores/map";
  import { awaitMapAnimation } from "../../stores/app";
  import type { PageData } from "./$types";
  import Swiper, { Parallax } from 'swiper';
  import "swiper/css";
  import { moveMap } from "$lib/utils/utils";

  export let data: PageData

  let swiperEl: HTMLElement | null = null;
  let swiper: Swiper

  $: if(!$awaitMapAnimation) {
    moveMap({
      position: data.place.position,
      zoom: 14
    })
  }

  onMount(() => {
    if (swiperEl) {
      swiper = new Swiper(swiperEl, {
        // Optional parameters
        // direction: 'vertical',
        modules: [Parallax],
        loop: true,
        parallax: true,
      });
    }

    if (!$awaitMapAnimation)
      moveMap({
        position: data.place.position,
        zoom: 14
      })
  })
</script>

<div class="flex items-center space-x-4 text-xl font-semibold">
  <div class="px-3 py-1 bg-yellow-600 text-white">{data.place.id}</div>
  <div class="text-2xl">{data.place.title}</div>
  <div class="!ml-auto flex items-center space-x-0">
    
    <a href="/{data.prev ? data.prev : ''}" 
      class="icon w-10 h-10 hover:text-red-600 {!data.prev ? 'pointer-events-none text-gray-500' : ''}">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
    </a>
    <a href="/{data.next ? data.next : ''}" 
      class="icon w-10 h-10 hover:text-red-600 {!data.next ? 'pointer-events-none text-gray-500' : ''}">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
    </a>
    <a href="/" class="icon w-10 h-10 hover:text-red-600">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
    </a>
  </div>
</div>

<div bind:this={swiperEl} class="swiper mt-4">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    {#each data.place.images as image}
      <div class="swiper-slide overflow-hidden">
        <img src="{image}" alt="title" loading="lazy" data-swiper-parallax="50%" />
        <div class="swiper-lazy-preloader">
          <div class="shimmer"></div>
        </div>
      </div>
    {/each}
  </div>
</div>
<p class="text-gray-500 mt-2">{data.place.description}</p>
<div class="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis officiis ab, aut aperiam repellendus sequi, qui animi assumenda modi natus corrupti nesciunt nam autem laudantium magnam nihil eveniet nemo fugit.</div>

<div class="flex items-center justify-between mt-4">
  <button class="btn">Xem địa điểm</button>
  <button class="btn btn-red">Chỉ đường</button>
</div>
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { map } from "../../stores/map";
  import { awaitMapAnimation } from "../../stores/app";
  import type { PageData } from "./$types";
  import Swiper, { Parallax } from 'swiper';
  import "swiper/css";
  import { moveMap } from "$lib/utils/utils";
  import LazyImage from "$lib/components/lazy_image.svelte";
  // import PhotoSwipeLightbox from 'photoswipe';
  // @ts-ignore
  import PhotoSwipeLightbox from 'photoswipe/lightbox';
  import 'photoswipe/style.css';

  export let data: PageData

  let swiperEl: HTMLElement | null = null;
  let swiper: Swiper
  let lightbox: PhotoSwipeLightbox

  $: if(!$awaitMapAnimation) {
    moveMap({
      position: data.place.position,
      zoom: 14
    })
  }

  let windowHeight: number, windowWidth: number

  const imageLoaded = (e: any) => {
    let image: HTMLImageElement | null = e.detail
    let galleryImage: HTMLElement | null = image?.closest('.gallery-image') || null
    if (galleryImage && image) {
      let tempWidth = image.naturalWidth
      let tempHeight = image.naturalHeight

      let ratioWindow = windowWidth / windowHeight
      let ratioImage =  tempWidth/ tempHeight

      if (ratioImage < ratioWindow && tempWidth < windowWidth) {
        tempHeight = windowHeight
        tempWidth = windowHeight * ratioImage
      }
      else if (ratioImage > ratioWindow && tempHeight < windowHeight) {
        tempWidth = windowWidth
        tempHeight = windowWidth / ratioImage
      }
      galleryImage.dataset.pswpWidth = tempWidth as any
      galleryImage.dataset.pswpHeight = tempHeight as any
    }
  }

  onMount(() => {
    if (swiperEl) {
      lightbox = new PhotoSwipeLightbox({
        gallery: swiperEl,
        children: 'a',
        // loop: false,
        pswpModule: () => import('photoswipe'),
      });

      lightbox.init();

      swiper = new Swiper(swiperEl, {
        // Optional parameters
        // direction: 'vertical',
        modules: [Parallax],
        loop: true,
        parallax: true
      });
    }

    if (!$awaitMapAnimation)
      moveMap({
        position: data.place.position,
        zoom: 14
      })
  })

  onDestroy(() => {
    swiper.destroy()
    lightbox.destroy()
  })
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

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

<div bind:this={swiperEl} id="gallery" class="swiper mt-4 -mx-4">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    {#each data.place.images as image}
      <div class="swiper-slide overflow-hidden">
        <a href="{image}" 
          class="gallery-image flex min-h-[200px]" 
          data-swiper-parallax="50%"
          data-pswp-width=1000
          data-pswp-height=800
          target="_blank"
          rel="noreferrer"
        >
          <div class="w-full">
            <LazyImage src={image} alt="title" on:load={imageLoaded} />
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

<div class="flex flex-col space-y-2 mt-3">
  <p class="font-semibold text-lg">{data.place.description}</p>
  
  <div class="flex space-x-1 text-yellow-500 items-center !my-0">
    <span class="text-gray-500">5,0</span>
    {#each new Array(5) as _}
      <span class="icon w-4 h-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
      </span>
    {/each}
  </div>

  <div class="border-y flex justify-around space-x-2 bg-white -mx-4 px-4 py-4">
    <div class="w-20 flex flex-col items-center space-y-1">
      <span class="icon rounded-full w-10 h-10 p-1 border border-blue-500  bg-blue-500 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m2.295 12.707 8.978 9c.389.39 1.025.391 1.414.002l9.021-9a1 1 0 0 0 0-1.416l-9.021-9a.999.999 0 0 0-1.414.002l-8.978 9a.998.998 0 0 0 0 1.412zm6.707-2.706h5v-2l3 3-3 3v-2h-3v4h-2v-6z"></path></svg>
      </span>
      <span class="text-sm text-blue-600 text-center">Đường đi</span>
    </div>

    <div class="w-20 flex flex-col items-center space-y-1">
      <span class="icon rounded-full w-10 h-10 p-2 border border-blue-500  text-blue-500 bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path></svg>
      </span>
      <span class="text-sm text-blue-600 text-center">Yêu thích</span>
    </div>

    <div class="w-20 flex flex-col items-center space-y-1">
      <span class="icon rounded-full w-10 h-10 p-2 border border-blue-500  text-blue-500 bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z"></path><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z"></path></svg>
      </span>
      <span class="text-sm text-blue-600 text-center">Xem chi tiết</span>
    </div>

    <div class="w-20 flex flex-col items-center space-y-1">
      <span class="icon rounded-full w-10 h-10 p-2 border border-blue-500  text-blue-500 bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m9 6.882-7-3.5v13.236l7 3.5 6-3 7 3.5V7.382l-7-3.5-6 3zM15 15l-6 3V9l6-3v9z"></path></svg>
      </span>
      <span class="text-sm text-blue-600 text-center">Mở trong google map</span>
    </div>

    <div class="w-20 flex flex-col items-center space-y-1">
      <span class="icon rounded-full w-10 h-10 p-2 border border-blue-500  text-blue-500 bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.5 15a3.51 3.51 0 0 0 2.36-.93l6.26 3.58a3.06 3.06 0 0 0-.12.85 3.53 3.53 0 1 0 1.14-2.57l-6.26-3.58a2.74 2.74 0 0 0 .12-.76l6.15-3.52A3.49 3.49 0 1 0 14 5.5a3.35 3.35 0 0 0 .12.85L8.43 9.6A3.5 3.5 0 1 0 5.5 15zm12 2a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm0-13A1.5 1.5 0 1 1 16 5.5 1.5 1.5 0 0 1 17.5 4zm-12 6A1.5 1.5 0 1 1 4 11.5 1.5 1.5 0 0 1 5.5 10z"></path></svg>
      </span>
      <span class="text-sm text-blue-600 text-center">Chia sẻ</span>
    </div>
  </div>

  <div class="flex flex-col space-y-4 !my-4">
    <div class="flex items-center space-x-4">
      <span class="flex-none w-7 h-7 icon text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path></svg>
      </span>
      <div class="flex-grow min-w-0">MGQQ+VP7, Vĩnh Thuận Đông, Long Mỹ, Hậu Giang, Việt Nam</div>
    </div>
    <div class="flex items-center space-x-4">
      <span class="flex-none w-7 h-7 icon text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path></svg>
      </span>
      <div class="flex-grow min-w-0 text-lime-700">Mở cả ngày</div>
    </div>
    <div class="flex items-center space-x-4">
      <span class="flex-none w-7 h-7 icon text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path></svg>
      </span>
      <div class="flex-grow min-w-0">+84 399 633 237</div>
    </div>
    <div class="flex items-center space-x-4">
      <span class="flex-none w-7 h-7 icon text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path></svg>
      </span>
      <div class="flex-grow min-w-0">viet.hung.2898@gmail.com</div>
    </div>
    <div class="flex items-center space-x-4">
      <span class="flex-none w-7 h-7 icon text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.063 15H13v2h9v-2zM4 7h11v2H4zm0 4h11v2H4zm0 4h7v2H4z"></path></svg>
      </span>
      <div class="flex-grow min-w-0">Chợ phiên Bắc Hà Lào Cai vào cuối tuần là nơi đông khách du lịch nhất Tây Bắc. Khí hậu Bắc Hà mát mẻ làm một điểm có tiềm năng về phát triển du lịch</div>
    </div>
  </div>
</div>

<style lang="postcss">
  .swiper-slide {
    @apply w-full relative;
  }
  /* :global(.pswp img) {
    max-width: none;
    object-fit: contain;
  } */
</style>
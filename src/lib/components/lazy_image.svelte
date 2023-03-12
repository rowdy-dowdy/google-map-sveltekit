<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let src: string
  export let alt: string = ""

  let load: boolean = true
  let error: boolean = false

  const imageLoaded = (e: Event) => {
    // console.log(e)
    dispatch("load", e.target)
    load = false
    error = false
  }

  const imageError = (e:Event) => {
    load = false
    error = true
  }
</script>

<div class="relative w-full h-full {load ? 'bg-gray-400 shimmer' : ''}">
  <img src="{src}" alt="{alt} " loading="lazy" on:load={imageLoaded} on:error={imageError} class="img-cover">
  {#if error}
    <div class="error">
      <span class="icon text-yellow-600 w-10 h-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path><path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path></svg>
      </span>
      <span class="text-xs">Không thể tải hình ảnh</span>
    </div>
  {/if}
</div>

<style lang="postcss">
  .error {
    @apply absolute w-full h-full top-0 left-0 bg-gray-300 flex flex-col space-y-2 items-center justify-center;
  }

  .shimmer {
    color: grey;
    display:block;
    -webkit-mask:linear-gradient(-60deg,#000 30%,#0005,#000 70%) right/300% 100%;
    background-repeat: no-repeat;
    animation: shimmer 2.5s infinite;
  }

  @keyframes -global-shimmer {
    100% {-webkit-mask-position:left}
  }
</style>
<script lang="ts">
  import { getLocation, getLocationPromise } from "$lib/utils/utils";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let isFullScreen = false

	const fullScreen = () => {
    if (!document.fullscreenElement) {
      isFullScreen = true
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      isFullScreen = false
      document.exitFullscreen();
    }
  }

  const moveToCurrentPostion = async () => {
    let location = await getLocationPromise()
    dispatch("current", location);
  }
</script>

<div class="flex flex-col space-y-2">
  <button on:click|preventDefault={moveToCurrentPostion}>
    <span class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path></svg>
    </span>
  </button>

  <button type="button" class="single-click" on:click|preventDefault={fullScreen} title="Reset View">
    {#if !isFullScreen}
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path></svg>
      </span>
    {:else}
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 4H8v4H4v2h6zM8 20h2v-6H4v2h4zm12-6h-6v6h2v-4h4zm0-6h-4V4h-2v6h6z"></path></svg>
      </span>
    {/if}
  </button>
</div>
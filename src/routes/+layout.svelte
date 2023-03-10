<script lang="ts">
  import "../app.css";
</script>

<slot/>

<style lang="postcss">
  :global(#app) {
    @apply w-full h-screen overflow-auto;
  }
</style>
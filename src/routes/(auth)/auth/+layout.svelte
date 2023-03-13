<script>
  import PageTransition from "$lib/components/page_transition.svelte";

  export let data;
</script>

<div class="flex h-full w-full items-stretch text-gray-600 overflow-x-hidden">
  <div class="flex w-5/12 items-center justify-center bg-gray-50 px-8 py-8">
    <img src="/bg-auth.png" alt="Image auth" class="w-full" />
  </div>

  <div class="w-7/12 px-20 py-8">
    <PageTransition url={data.url}>
      <slot />
    </PageTransition>
  </div>
</div>
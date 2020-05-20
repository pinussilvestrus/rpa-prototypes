<script>
  import { onMount } from 'svelte';

  const noop = () => {};

  onMount(async () => {
    onAction();
  });
  
  export let onAction = noop;
</script>
<script>
  import { onMount } from 'svelte';

  import { findIndex } from 'min-dash';


  // variant A - Current Modeler
  import Editor_A from './components/variant_A/Editor.svelte';

  // variant B - Catalog Approach
  import Editor_B from './components/variant_B/Editor.svelte';

  // variant C - Catalog Approach - Modal
  import Editor_C from './components/variant_C/Editor.svelte';

  import './App.scss';

  const VARIANTS = ['A', 'B', 'C'];

  const DEFAULT_VARIANT = 'A';

  const toggleVariant = (variant) => {
    const found = findIndex(VARIANTS, v => v === variant);

    if (found < 0) {
      return active = VARIANTS[0];
    }
  
    active = variant;
    updateURL(variant);
  };

  const onNextVariant = () => {
    const found = findIndex(VARIANTS, v => v === active);

    if (found === VARIANTS.length - 1) {
      return toggleVariant(VARIANTS[0]);
    }

    return toggleVariant(VARIANTS[found + 1]);
  };


  // state //////////
  let active = DEFAULT_VARIANT;


  // lifecycle //////////
  onMount(async () => {
    const variant = urlParam('variant');
    toggleVariant(variant);
  });


  // helpers //////////

  function updateURL(variant) {
    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?variant=${variant}`;
    window.history.pushState({ path: newurl }, '', newurl);
  }

  function urlParam(name) {
    const results = new RegExp('[?&]' + name + '=([^&#]*)')
      .exec(window.location.href);

    return results && results[1] || DEFAULT_VARIANT;
  }


</script>

<div class="variant-badge" on:click={onNextVariant}>
  <span>{active}</span>
</div>

{#if active === 'A'}
  <div class="variant variant-a">
      <Editor_A />
  </div>
{/if}

{#if active === 'B'}
  <div class="variant variant-b">
      <Editor_B />
  </div>
{/if}

{#if active === 'C'}
  <div class="variant variant-c">
      <Editor_C />
  </div>
{/if}
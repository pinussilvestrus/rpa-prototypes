<script>
  import { onMount } from 'svelte';

  import { findIndex } from 'min-dash';


  // variant A - Without Catalog
  // variant A1 - IO Simple UI
  // import Editor_A1 from './components/variant_A1/Editor.svelte';

  // variant A2 - IO Two Step
  import Editor_A2 from './components/variant_A2/Editor.svelte';

  // variant B - With Catalog
  // variant B1 - IO Simple UI
  // import Editor_B1 from './components/variant_B1/Editor.svelte';

  // variant B2 - IO Two Step
  import Editor_B2 from './components/variant_B2/Editor.svelte';

  import './App.scss';

  const VARIANTS = ['A', 'B'];

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
      toggleVariant(VARIANTS[0]);
    } else {
      toggleVariant(VARIANTS[found + 1]);
    }

    // only for this prototype: restore data
    // todo(pinussilvestrus): find better way
    window.location.reload();
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
  <div class="variant variant-a1">
      <Editor_A2 />
  </div>
{/if}

<!-- {#if active === 'A2'}
  <div class="variant variant-a2">
      <Editor_A2 />
  </div>
{/if} -->

{#if active === 'B'}
  <div class="variant variant-b1">
      <Editor_B2 />
  </div>
{/if}

<!-- {#if active === 'B2'}
  <div class="variant variant-b2">
      <Editor_B2 />
  </div>
{/if} -->
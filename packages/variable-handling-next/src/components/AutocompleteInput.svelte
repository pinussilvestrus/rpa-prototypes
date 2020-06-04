<script>
    import './AutocompleteInput.scss';

    import { afterUpdate } from 'svelte';

    import dom from 'domtastic';

    afterUpdate(async () => {
    
      // as long no reactivity is stated here, remove input content
      if (!value) {
        const inputNode = dom(`input[id="${id}"]`);
        inputNode.val(null);
      }
    });

    const noop = () => {};

    export let id;
    export let name;
    export let type;
    export let placeholder;
    export let value = '';
    export let items = [];
    export let onInputFocus = noop;
    export let onInputFocusOut = noop;
</script>

<div class="autocomplete">
  <input 
    id="{id}" 
    autocomplete="off"
    type="{type}" 
    name="{name}" 
    placeholder="{placeholder}"
    list="items"
    value="{value}"
    on:focus={onInputFocus}
    on:focusout={onInputFocusOut} />
  <datalist id="items">
     {#each items as item }
        <option class="item" value="{item}" />
     {/each}
  </datalist>
</div>
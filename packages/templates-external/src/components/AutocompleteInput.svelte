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
    
    export let id;
    export let name;
    export let placeholder;
    export let value = '';
    export let items = [];
</script>

<div class="autocomplete">
  <input 
    id="{id}" 
    autocomplete="off"
    name="{name}" 
    placeholder="{placeholder}"
    list="items"
    bind:value="{value}"/>
  <datalist id="items">
     {#each items as item }
        <option class="item" value="{item}" />
     {/each}
  </datalist>
</div>
<script>
    import './AutocompleteInput.scss';

    import { onMount } from 'svelte';

    import { debounce, forEach } from 'min-dash';

    import dom from 'domtastic';

    // lifecycle //////////

    let filteredItems = [];
    $: { // handleItemsUpdate
      const itemsNode = dom('.autocomplete-items');
      itemsNode.css('display', filteredItems.length ? 'block': 'none');
    }

    onMount(async () => {
    
      // as long no reactivity is stated here, set input content to default
      if (!value) {
        const inputNode = dom(`input[id="${id}"]`);
        inputNode.val(defaultValue);
      }
    });


    // methods //////////

    const setFullItems = () => {
      filteredItems = items;
    };

    const clear = () => {
      filteredItems = [];
    };

    const handleClick = (event) => {
      setFullItems();
    };

    const handleInputChange = ({ target }) => {
      const node = dom(target);

      const value = node.val();

      if (!value || value === '') {
        return setFullItems({ target });
      }

      filteredItems = [];
    
      forEach(items, (item) => {
    
        // simple start search, todo: improve
        if (item.startsWith(value)) {
          filteredItems.push(item);
        }
      });
    };

    const handleFocusOut = ({ target }) => {
      clear();
    };

    const handleItemSelect = ({ target }) => {
      const node = dom(target);
    
      clear();
      value = node.text();
    };
    

    // exports //////////

    export let id;
    export let name;
    export let defaultValue;
    export let value = '';
    export let items = [];
</script>

<div class="autocomplete">
  <input 
    id="{id}" 
    on:mouseup|preventDefault={handleClick}
    on:input|preventDefault={handleInputChange}
    on:focusout|preventDefault={debounce(handleFocusOut, 200)}
    autocomplete="off"
    name="{name}" 
    list="{`items-${id}`}"
    bind:value="{value}"/>
  <div class="autocomplete-items">
    {#each filteredItems as item }
      <p class="autocomplete-item" on:click={handleItemSelect}>{item}</p>
    {/each}
  </div>
</div>

<!-- <div class="autocomplete">
  <input 
    id="{id}" 
    on:click={handleClick}
    autocomplete="off"
    name="{name}" 
    list="{`items-${id}`}"
    bind:value="{value}"/>
  <select id="{`items-${id}`}">
     {#each items as item }
        <option class="item" value="{item}" />
     {/each}
  </select>
</div> -->
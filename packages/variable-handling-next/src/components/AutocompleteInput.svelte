<script>
    import dom from 'domtastic';

    import { debounce, forEach, map } from 'min-dash';

    import './AutocompleteInput.scss';

    const noop = () => {};

    let filteredItems = [];
    $: { // handleItemsUpdate
      const itemsNode = dom('.items');
      itemsNode.css('display', filteredItems.length ? 'block': 'none');
    }

    const handleInputChange = debounce(handleChange, 500);

    function clear() {
      filteredItems = [];
    }

    function setFullItems({ target }) {
      if (target.value !== '') {
        return;
      }

      return filteredItems = map(items, i => { return { rest: i }; });
    }

    function handleItemSelect({ target }) {
      const node = dom(target);

      const inputNode = node.closest('.autocomplete').find('input');
    
      clear();
      inputNode.val(node.text());
      onInputChange({ target: inputNode[0] });
    }

    function handleChange({ target }) {
      const node = dom(target);

      const value = node.val();

      if (!value || value === '') {
        return setFullItems({ target });
      }

      filteredItems = [];

      forEach(items, item => {
    
        // simple start search, todo: improve
        if (item.startsWith(value)) {
          filteredItems.push({
            match: value,
            rest: item.substr(value.length)
          });
        }
      });
    }

    export let id;
    export let name;
    export let type;
    export let placeholder;
    export let value = '';
    export let items = [];
    export let onInputChange = noop;
    export let onInputFocus = noop;
    export let onInputFocusOut = noop;
</script>

<div class="autocomplete">
  <input 
    autocomplete="off"
    id="{id}" 
    type="{type}" 
    name="{name}" 
    placeholder="{placeholder}"
    value={value}
    on:change|preventDefault={onInputChange} 
    on:focus={onInputFocus}
    on:focusout={onInputFocusOut}
    on:click={setFullItems}
    on:input={handleInputChange}/>
  <div class="items">
     {#each filteredItems as {match, rest} }
        <div class="item" on:click={handleItemSelect}>{#if match}<strong>{match}</strong>{/if}{rest}</div>
     {/each}
  </div>
</div>
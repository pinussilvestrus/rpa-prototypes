<script>
    import './AutocompleteInput.scss';

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
    value={value}
    list="items"
    on:focus={onInputFocus}
    on:focusout={onInputFocusOut} />
  <datalist id="items">
     {#each items as item }
        <option class="item" value="{item}" />
     {/each}
  </datalist>
</div>
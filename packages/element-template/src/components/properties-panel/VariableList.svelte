<script>
    const noop = () => {};

    export let onSelectionChanged = noop;
    export let variables = [];
    export let title;
    export let id;
</script>


<label>{title}</label>
<select 
  id="{id}"
  size="3" 
  on:change={onSelectionChanged} >
    {#each variables as {name}}
      <option>{name}</option>
    {/each}
</select>
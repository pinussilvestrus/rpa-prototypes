<script>
  export let templates;
  export let element;
  export let handleTemplateChanged;
</script>


<label>Implementation</label>
<!-- svelte-ignore a11y-no-onchange -->
<select id="element-template" on:change="{handleTemplateChanged}">
  <option></option>
  <optgroup label="Implementation Templates">
    {#each templates as {id, name, type}}
      <option 
        selected={element.template && element.template.id === id} 
        value="{id}" >
          {name} ({type})
      </option>
    {/each}
  </optgroup>
  <optgroup label="Default Implementation Types">
    <option>Java Class</option>
    <option>Expression</option>
    <option>Delegate Expression</option>
    <option>External</option>
    <option>Connector</option>
  </optgroup>
</select>
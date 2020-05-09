<script>
    import './PropertiesPanel.scss';

    let isHidden = true;
    $: isHidden = !element;

    export let element = null;
</script>

<div class="properties-panel" class:hidden="{isHidden}">
  <div class="container">
    {#if element}
      <div class="header">
        <div class="title">{element.name}</div>
      </div>

      <div class="section">
        <h1>General</h1>

        <label>Id</label>
        <input value="{element.id}"/>

        <label>Name</label>
        <input value="{element.name}"/>

        <label>Element Template</label>
        <select id="element-template">
          <option></option>
          <option>Get Price Tag</option>
          <option>Calculate Price</option>
          <option>Print Bill</option>
        </select>
      </div>
    {/if}
  </div>
</div>
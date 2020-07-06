<script>
  import dom from 'domtastic';

  import Switch from '../../Switch';

  const noop = () => {};

  // methods //////////

  const handleTitleClick = (event) => {
    const titleNode = dom(event.target),
          containerGfx = titleNode.closest('.form-field');

    if (containerGfx.hasClass('active')) {
      containerGfx.removeClass('active');
    } else {
      containerGfx.addClass('active');
    }
  };

  const handleDelete = () => {
    onDeleteItem('outputs', formField.id);
  };

  const handleCheck = (checked) => {
    formField.isFormField = checked;
  };


  // exports //////////

  export let formField;
  export let onDeleteItem = noop;


  // helpers //////////

  const getHeaderDescription = (formField) => {
    return formField.description;
  };

  const isFormField = (formField) => {
    return formField.isFormField;
  };

</script>

<div class="item form-field" id={`${formField.id}`}>
    <div class="item-header form-field-header" on:click={handleTitleClick}>
      <p class="item-name"><i class="chevron"></i>{formField.name}</p>
      <p class="item-description">{getHeaderDescription(formField)}</p>
    </div>
    <div class="item-details form-field-details">
      <label>ID</label>
      <input autocomplete="off" name="name" bind:value={formField.name} />

      <label>Description</label>
      <textarea name="description" bind:value={formField.description} />

      <!-- todo(pinussilvestrus): add validation + properties -->
      <label>Form Field Details</label>

      <Switch onCheck="{handleCheck}" checked={isFormField(formField)} />

      {#if isFormField(formField)}
        <label>Type</label>
        <select name="type" bind:value={formField.type}>
          <option></option>
          <option>string</option>
          <option>long</option>
          <option>boolean</option>
          <option>date</option>
          <option>enum</option>
          <option value="custom-type">custom type</option>
        </select>

        {#if formField.type === 'custom-type'}
          <input name="custom-type" bind:value={formField.customType} />
        {/if}

        <label>Label</label>
        <input autocomplete="off" name="label" bind:value={formField.label} />

        <label>Default Value</label>
        <input autocomplete="off" name="defaultValue" bind:value={formField.defaultValue} />

        <div class="action delete" on:click={handleDelete}>Delete Variable</div>
      {/if}
    </div>
</div>
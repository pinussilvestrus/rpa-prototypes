<script>
  import dom from 'domtastic';

  import './OutputMappingItem.scss';

  const MAPPING_TYPES = [
    {
      id: 'expression',
      name: 'Expression'
    },
    {
      id: 'inline-script',
      name: 'Inline Script'
    },
    {
      id: 'external-script',
      name: 'External Script Resource'
    }
  
  // {
    //   id: 'list',
    //   name: 'List'
    // },
    // {
    //   id: 'map',
    //   name: 'Map'
    // }
  ];

  const noop = () => {};



  // methods //////////

  const handleTitleClick = (event) => {
    const titleNode = dom(event.target),
          containerGfx = titleNode.closest('.output-mapping');

    if (containerGfx.hasClass('active')) {
      containerGfx.removeClass('active');
    } else {
      containerGfx.addClass('active');
    }
  };

  const handleDelete = () => {
    onDeleteItem('outputMappings', outputMapping.id);
  };


  // exports //////////

  export let outputMapping;
  export let onDeleteItem = noop;
</script>

<div class="item output-mapping" id={`${outputMapping.id}`}>
    <div class="item-header output-mapping-header" on:click={handleTitleClick}>
      <p class="item-name"><i class="chevron"></i>{outputMapping.name}</p>
      <p class="item-description">{outputMapping.description}</p>
    </div>
    <div class="item-details outputMapping-details">
      <label>New Process Variable Name</label>
      <input autocomplete="off" name="name" bind:value={outputMapping.name} />

      <label>Description</label>
      <textarea name="description" bind:value={outputMapping.description} />

      <label>Output Mapping</label>
      <select name="type" bind:value={outputMapping.mappingType}>
          {#each MAPPING_TYPES as {id, name}}
            <option value={id}>{name}</option>
          {/each}
      </select>

      {#if outputMapping.mappingType === 'expression'}
        <textarea autocomplete="off" name="expression" bind:value={outputMapping.expression} />
      {:else if outputMapping.mappingType === 'inline-script'}
        <label>Format</label>
        <input autocomplete="off" name="script-format" bind:value={outputMapping.scriptFormat}  />

        <label>Script</label>
        <textarea name="script-content" rows="5" bind:value={outputMapping.internalScript}></textarea>
      {:else if outputMapping.mappingType === 'external-script'}
        <label>Format</label>
        <input autocomplete="off" name="script-format" bind:value={outputMapping.scriptFormat} />

        <label>Resource</label>
        <input autocomplete="off" name="script-resource" bind:value={outputMapping.externalScriptRespource} />

      {:else if outputMapping.mappingType === 'list'}
        <div class="action add-list-value">+ Add Value</div>
    
        <label>Value</label>
        <input />
  
      {:else if outputMapping.mappingType === 'map'}
        <div class="action add-list-value">+ Add Entry</div>
    
        <div class="map-entry-header">
            <p>Key</p><p>Value</p>
        </div>
        <div class="map-entry">
          <input />
          <input />
        </div>
      {/if}

      <div class="action delete" on:click={handleDelete}>Delete Transformation</div>
    </div>
</div>
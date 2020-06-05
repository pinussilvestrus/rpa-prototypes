<script>
  import dom from 'domtastic';

  import './OutputMappingItem.scss';

  const MAPPING_TYPES = [
    {
      id: 'expression',
      name: 'Expression'
    },
    {
      id: 'script',
      name: 'Script'
    },
    {
      id: 'list',
      name: 'List'
    },
    {
      id: 'map',
      name: 'Map'
    }
  ];



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


  // exports //////////

  export let outputMapping;
</script>

<div class="item output-mapping" id={`${outputMapping.id}`}>
    <div class="item-header output-mapping-header" on:click={handleTitleClick}>
      <p class="item-name"><i class="chevron"></i>{outputMapping.name}</p>
      <p class="item-description">{outputMapping.description}</p>
    </div>
    <div class="item-details outputMapping-details">
      <label>New Process Variable Name</label>
      <input name="name" bind:value={outputMapping.name} />

      <label>Description</label>
      <textarea name="description" bind:value={outputMapping.description} />

      <label>Output Mapping</label>
      <select name="type" bind:value={outputMapping.mappingType}>
          {#each MAPPING_TYPES as {id, name}}
            <option value={id}>{name}</option>
          {/each}
      </select>

      {#if outputMapping.mappingType === 'expression'}
        <input />
      {:else}
        ...
      {/if}
    </div>
</div>
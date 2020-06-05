<script>
  import dom from 'domtastic';

  import './InputItem.scss';

  import AutocompleteInput from '../../AutocompleteInput';

  const MAPPING_TYPES = [
    {
      id: 'process-variable',
      name: 'Process Variable'
    },
    {
      id: 'constant-value',
      name: 'Constant Value'
    },
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

  const DUMMY_VARS = ['var_1', 'otherVar'];


  // methods //////////

  const handleTitleClick = (event) => {
    const titleNode = dom(event.target),
          containerGfx = titleNode.closest('.input');

    if (containerGfx.hasClass('active')) {
      containerGfx.removeClass('active');
    } else {
      containerGfx.addClass('active');
    }
  };


  // exports //////////

  export let input;
</script>

<div class="item input" id={`${input.id}`}>
    <div class="item-header input-header" on:click={handleTitleClick}>
      <p class="item-name"><i class="chevron"></i>{input.name}</p>
      <p class="item-description">{input.description}</p>
    </div>
    <div class="item-details input-details">
      <label>Input Parameter Name</label>
      <input autocomplete="off" name="name" bind:value={input.name} />

      <label>Description</label>
      <textarea name="description" bind:value={input.description} />

      <label>Input Mapping</label>
      <select name="type" bind:value={input.mappingType}>
          {#each MAPPING_TYPES as {id, name}}
            <option value={id}>{name}</option>
          {/each}
      </select>

      {#if input.mappingType === 'process-variable'}
        <AutocompleteInput 
          id="{`${input.id}-value`}"
          name="mapping"
          type="text"
          bind:value={input.mapping}
          items={DUMMY_VARS}
          placeholder="{`auto-filled by <${input.name}> process variable`}"
        />
      {:else}
        ...
      {/if}

    </div>
</div>
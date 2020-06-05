<script>
  import dom from 'domtastic';

  import { find } from 'min-dash';

  import AutocompleteInput from '../../AutocompleteInput';

  const noop = () => {};

  const MAPPING_TYPES = [
    {
      id: 'simple',
      name: 'Simple'
    },
    {
      id: 'inline-script',
      name: 'Inline Script'
    },
    {
      id: 'external-script',
      name: 'External Script Resource'
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

  const DEFAULT_MAPPING_TYPE = 'simple';

  let selectedMappingType = DEFAULT_MAPPING_TYPE;


  // lifecycle //////////

  // reset mapping selection if update comes
  $: {
    if (variable) {
      selectedMappingType = selectMappingType(DEFAULT_MAPPING_TYPE);
    }
  }

  // methods //////////

  const selectMappingType = (id) => {
    if (!find(MAPPING_TYPES, type => type.id === id)) {

      // default
      selectedMappingType = 'simple';
    } else {
      selectedMappingType = id;
    }

  };

  const handleTitleClick = (event) => {
    const titleNode = dom(event.target),
          containerGfx = titleNode.closest('.variable');

    if (containerGfx.hasClass('active')) {
      containerGfx.removeClass('active');
    } else {
      containerGfx.addClass('active');
    }
  };

  const handleInputChange = (event) => {
    const inputNode = dom(event.target);
  
    onUpdateVariable(variable.id, {
      [inputNode.attr('name')]: inputNode.val()
    });
  };

  // exports //////////
  
  export let variable;
  export let onUpdateVariable = noop;
  
  
  // helpers //////////
  
  const isInputVariable = (variable) => {
    return variable.type === 'input';
  };

</script>


<div class="variable" id={`variable-${variable.id}`}>
  <div class="variable-header" on:click={handleTitleClick}>
    <p class="variable-name"><i class="chevron"></i>{variable.name}</p>
    <p class="variable-description">{variable.description}</p>
  </div>
  <div class="variable-details">
    <!-- <label>Mapping Type</label> -->

    <!-- svelte-ignore a11y-no-onchange -->
    <!-- <select name="type" on:change={handleMappingTypeChange}>
        {#each MAPPING_TYPES as {id, name}}
        <option value={id} selected={selectedMappingType === id}>{name}</option>
        {/each}
    </select> -->

    {#if selectedMappingType === 'inline-script'}
      <label>Format</label>
      <input 
        name="script-format" />

      <label>Script</label>
      <textarea
        name="script-content"
        rows="5"></textarea>

    {:else if selectedMappingType === 'external-script'}
      <label>Format</label>
      <input 
        name="script-format" />

      <label>Resource</label>
      <input
        name="script-resource" />

    {:else if selectedMappingType === 'list'}
      <div class="add-list-value">+ Add Value</div>
  
      <label>Value</label>
      <input />

    {:else if selectedMappingType === 'map'}
      <div class="add-list-value">+ Add Entry</div>
  
      <div class="map-entry-header">
          <p>Key</p><p>Value</p>
      </div>
      <div class="map-entry">
        <input />
        <input />
      </div>
      
    {:else}
      <label>{isInputVariable(variable) ? 'Value' : 'Process Variable'}</label>

      {#if isInputVariable(variable)}
          <AutocompleteInput 
            id="{`${variable.id}-value`}"
            name="value"
            type="text"
            onChange={handleInputChange}
            value={variable.value}
            items={variable.availableOptions}
            placeholder="{`auto-filled by <${variable.name}> process variable`}"
          />
      {:else}

        <input 
          name="value" 
          bind:value={variable.value}
          autocomplete="off"
          placeholder="{`auto-written to <${variable.name}> process variable`}" />
      {/if}
    {/if}
  </div>
</div>
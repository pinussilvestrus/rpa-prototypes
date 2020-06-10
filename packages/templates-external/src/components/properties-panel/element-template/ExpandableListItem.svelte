<script>
  import dom from 'domtastic';

  import { onMount } from 'svelte';

  import { filter, find, map } from 'min-dash';

  import AutocompleteInput from '../../AutocompleteInput';

  import { variableStore } from '../../../stores';

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


  let availableOptions;
  onMount(async () => {
    variableStore.subscribe(list => {
      availableOptions = map(list, (item) => item.value);

      // do not use variables which are in this scope (e.g. as output)
      availableOptions = filter(availableOptions, (option) => {
        return !find(ignoredSuggestions, (output) => option === output.name);
      });
    });
  });


  // methods //////////

  const handleTitleClick = (event) => {
    const titleNode = dom(event.target),
          containerGfx = titleNode.closest('.variable');

    if (containerGfx.hasClass('active')) {
      containerGfx.removeClass('active');
    } else {
      containerGfx.addClass('active');
    }
  };

  // exports //////////
  
  export let variable;
  export let ignoredSuggestions = [];

  
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

    <label>Description</label>
    <textarea name="description" bind:value={variable.description} rows="3" disabled />

    {#if isInputVariable(variable)}

      <label>Input Transformation Type</label>

      <select name="type" bind:value={variable.mappingType}>
          {#each MAPPING_TYPES as {id, name}}
            <option value={id} selected={variable.mappingType === id}>{name}</option>
          {/each}
      </select>

      {#if variable.mappingType === 'constant-value'}
        <input autocomplete="off" name="constantValue" bind:value={variable.constantValue} />
      {:else if variable.mappingType === 'expression'}
        <textarea autocomplete="off" name="expression" bind:value={variable.expression} />
      {:else if variable.mappingType === 'inline-script'}
        <label>Format</label>
        <input autocomplete="off" name="script-format" bind:value={variable.scriptFormat}  />

        <label>Script</label>
        <textarea name="script-content" rows="5" bind:value={variable.internalScript}></textarea>
      {:else if variable.mappingType === 'external-script'}
        <label>Format</label>
        <input autocomplete="off" name="script-format" bind:value={variable.scriptFormat} />

        <label>Resource</label>
        <input autocomplete="off" name="script-resource" bind:value={variable.externalScriptRespource} />

      {:else if variable.mappingType === 'list'}
        <div class="action add-list-value">+ Add Value</div>

        <label>Value</label>
        <input />

      {:else if variable.mappingType === 'map'}
        <div class="action add-list-value">+ Add Entry</div>

        <div class="map-entry-header">
            <p>Key</p><p>Value</p>
        </div>
        <div class="map-entry">
          <input />
          <input />
        </div>

      {:else}
        {#if isInputVariable(variable)}
          <AutocompleteInput 
            id="{`${variable.id}-template-value`}"
            name="value"
            type="text"
            bind:value={variable.mapping}
            items={availableOptions}
            placeholder="{`auto-filled by <${variable.name}> process variable`}"
          />
        {:else}

        <input 
            name="value" 
            bind:value={variable.mapping}
            autocomplete="off"
            placeholder="{`auto-written to <${variable.name}> process variable`}" />
        {/if}
      {/if}
    {/if}
  </div>
</div>
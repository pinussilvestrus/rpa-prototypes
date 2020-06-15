<script>
  import dom from 'domtastic';

  import { onMount } from 'svelte';

  import { get } from 'svelte/store';

  import { filter, find, map } from 'min-dash';

  import AutocompleteInput from '../../AutocompleteInput';

  import { variableStore } from '../../../stores';

  import WarningSvg from '../../svg/warning.svg';

  // todo(pinussilvestrus): that could be refactored to something easier
  const INPUT_MAPPING_TYPES = [
    {
      id: 'process-variable',
      name: 'Process Variable',
      descriptionProperty: 'mapping'
    },
    {
      id: 'constant-value',
      name: 'Constant Value',
      descriptionProperty: 'constantValue'
    },
    {
      id: 'expression',
      name: 'Expression',
      descriptionProperty: 'expression'
    },
    {
      id: 'inline-script',
      name: 'Inline Script',
      descriptionProperty: 'inlineScript'
    },
    {
      id: 'external-script',
      name: 'External Script Resource',
      descriptionProperty: 'externalScriptResource'
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

  const OUTPUT_MAPPING_TYPES = [
    {
      id: 'process-variable',
      name: 'Process Variable',
      descriptionProperty: 'mapping'
    },
    {
      id: 'expression',
      name: 'Expression',
      descriptionProperty: 'expression'
    },
    {
      id: 'inline-script',
      name: 'Inline Script',
      descriptionProperty: 'inlineScript'
    },
    {
      id: 'external-script',
      name: 'External Script Resource',
      descriptionProperty: 'externalScriptResource'
    }
  ];


  // lifecycle //////////

  let availableOptions;
  onMount(async () => {
    variableStore.subscribe(list => {
      availableOptions = map(list, (item) => item.name);

      // do not use variables which are in this scope (e.g. as output)
      availableOptions = filter(availableOptions, (option) => {
        return !find(ignoredSuggestions, (output) => option === output.name);
      });
    });
  });

  // check whether template variable is already available in process context
  $: {
    if (isInputVariable(variable)) {
      const allVariables = get(variableStore);
  
      variable.isMissing =
        !hasMapping(variable) &&
        !find(allVariables, (v) => v.name === variable.name);
    }
  }


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

  const hasMapping = (variable) => {
    return !!variable.mapping ||
      (variable.mappingType && variable.mappingType !== 'process-variable') ||
      (variable.mappingType === 'process-variable' && variable.mapping !== '');
  };

  const getHeaderDescription = (variable) => {
    if (!hasMapping(variable)) {
      return variable.description;
    }

    const mappingType = find(
      isInputVariable(variable) ? INPUT_MAPPING_TYPES : OUTPUT_MAPPING_TYPES,
      (type) => type.id === variable.mappingType);

    return variable[mappingType.descriptionProperty]
      ? `Mapping: ${variable[mappingType.descriptionProperty]}`
      : variable.description;
  };

</script>


<div class="variable" id={`variable-${variable.id}`}>
  <div class="variable-header" on:click={handleTitleClick}>
    <p class="variable-name"><i class="chevron"></i>{variable.name}</p>
    <p class="variable-missing" class:active="{variable.isMissing}">{@html WarningSvg}</p>
    <p class="variable-description">{getHeaderDescription(variable)}</p>
  </div>
  <div class="variable-details">

    <label>Description</label>
    <textarea name="description" bind:value={variable.description} rows="3" disabled />

    {#if isInputVariable(variable)}

      <label>Input Mapping</label>

      <select name="type" bind:value={variable.mappingType}>
          {#each INPUT_MAPPING_TYPES as {id, name}}
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
        <textarea name="script-content" rows="5" bind:value={variable.inlineScript}></textarea>
      {:else if variable.mappingType === 'external-script'}
        <label>Format</label>
        <input autocomplete="off" name="script-format" bind:value={variable.scriptFormat} />

        <label>Resource</label>
        <input autocomplete="off" name="script-resource" bind:value={variable.externalScriptResource} />

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
          <div class:mapping-missing="{variable.isMissing}">
            <AutocompleteInput 
              id="{`${variable.id}-template-value`}"
              name="mapping"
              type="text"
              bind:value={variable.mapping}
              items={availableOptions}
              placeholder="{`auto-filled by <${variable.name}> process variable`}"
            />

            {#if variable.isMissing}
              <p>The auto-filled variable is not available in the process context!</p>
            {/if}
          </div>
      {/if}
    {:else if false}
      <label>Output Transformation Type</label>

      <select name="type" bind:value={variable.mappingType}>
          {#each OUTPUT_MAPPING_TYPES as {id, name}}
            <option value={id} selected={variable.mappingType === id}>{name}</option>
          {/each}
      </select>

      {#if variable.mappingType === 'expression'}
        <textarea autocomplete="off" name="expression" bind:value={variable.expression} />
      {:else if variable.mappingType === 'inline-script'}
        <label>Format</label>
        <input autocomplete="off" name="script-format" bind:value={variable.scriptFormat}  />

        <label>Script</label>
        <textarea name="script-content" rows="5" bind:value={variable.inlineScript}></textarea>
      {:else if variable.mappingType === 'external-script'}
        <label>Format</label>
        <input autocomplete="off" name="script-format" bind:value={variable.scriptFormat} />

        <label>Resource</label>
        <input autocomplete="off" name="script-resource" bind:value={variable.externalScriptResource} />
      {:else}
        <input 
          autocomplete="off" 
          name="process-variable" 
          bind:value={variable.processVariable} 
          placeholder={`auto-written to <${variable.name}> process variable`} />
      {/if}
    {/if}
  </div>
</div>
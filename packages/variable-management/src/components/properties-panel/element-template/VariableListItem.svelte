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
      id: 'none',
      name: 'None'
    },
    {
      id: 'process-variable',
      name: 'Process Variable',
      descriptionProperty: 'processVariable'
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
  ];

  const OUTPUT_MAPPING_TYPES = [
    {
      id: 'none',
      name: 'None'
    },
    {
      id: 'process-variable',
      name: 'Process Variable',
      descriptionProperty: 'processVariable'
    }
  ];


  // lifecycle //////////

  let availableOptions;
  onMount(async () => {
    variableStore.subscribe(list => {
      availableOptions = getAllAvailableOptions(list);
    });
  });

  // check whether template variable is already available in process context
  $: {
    if (isInputVariable(variable)) {
      const allVariables = get(variableStore);

      const allAvailableOptions = getAllAvailableOptions(allVariables);

      if (!variable.processVariable) {
        variable.processVariable = variable.name;
      }

      if (!variable.mappingType) {
        variable.mappingType = 'process-variable';
      }
  
      variable.isMissing =
        !hasExtendedMapping(variable) &&
        !find(allAvailableOptions, (v) => v === variable.processVariable);
    }
  }

  // auto-fill process variable name with local variable name
  $: {
    if (!isInputVariable(variable)) {
      if (!variable.processVariable) {
        variable.processVariable = variable.name;
      }

      if (!variable.mappingType) {
        variable.mappingType = 'none';
      }
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
  export let elementId;

  
  // helpers //////////
  
  const isInputVariable = (variable) => {
    return variable.type === 'input';
  };

  const getAllAvailableOptions = (list) => {

    // do not use variables which are in this local scope
    const filtered = filter(list, (option) => {
      return option.writtenFrom.id !== elementId;
    });

    return map(filtered, (item) => item.name);
  };

  const hasExtendedMapping = (variable) => {
    return (variable.mappingType && variable.mappingType !== 'process-variable');
  };
  const hasMapping = (variable) => {
    return !!variable.mappingType;
  };

  const getHeaderDescription = (variable) => {
    if (!hasMapping(variable)) {
      return variable.description;
    }

    const mappingType = find(
      isInputVariable(variable) ? INPUT_MAPPING_TYPES : OUTPUT_MAPPING_TYPES,
      (type) => type.id === variable.mappingType);

    return mappingType && variable[mappingType.descriptionProperty]
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

    {#if isInputVariable(variable)}

      <label>Task Variable Name</label>
      <input name="name" bind:value={variable.name} disabled />

      <label>Description</label>
      <textarea name="description" bind:value={variable.description} rows="3" disabled />

      <label>Mapping</label>

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
      {:else if variable.mappingType === 'none'} 
        <div class="hint">Without mapping, this variable is only documentation and no dedicated local input variable will be created.</div>
      {:else}
          <div class:mapping-missing="{variable.isMissing}">
            <label>Process Variable Name</label>
            <AutocompleteInput 
              id="{`${variable.id}-template-value`}"
              name="mapping"
              type="text"
              bind:value={variable.processVariable}
              items={availableOptions}
              defaultValue={variable.name}
              placeholder="{`auto-filled by <${variable.name}> process variable`}"
            />

            {#if variable.isMissing}
              <p class="mapping-missing-hint">The specified variable is not available in the process context!</p>
            {/if}
          </div>
      {/if}
    {:else}   
      <label>Task Variable Name</label>
      <input disabled name="name" bind:value={variable.name} />

      <label>Description</label>
      <textarea name="description" bind:value={variable.description} rows="3" disabled />

      <label>Mapping</label>

      <select name="type" bind:value={variable.mappingType}>
          {#each OUTPUT_MAPPING_TYPES as {id, name}}
            <option value={id} selected={variable.mappingType === id}>{name}</option>
          {/each}
      </select>

      {#if variable.mappingType === 'process-variable'}
        <label>Process Variable Name</label>
        <input 
          autocomplete="off" 
          name="process-variable" 
          bind:value={variable.processVariable} />
      {:else if variable.mappingType === 'none'}
        <small class="hint">By enabling "None" this variable will not be available in the process context.</small>
      {/if}
    {/if}
  </div>
</div>
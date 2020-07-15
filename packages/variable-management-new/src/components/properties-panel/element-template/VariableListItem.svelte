<script>
  import dom from 'domtastic';

  import { onMount } from 'svelte';

  import { get } from 'svelte/store';

  import { filter, find, map } from 'min-dash';

  import AutocompleteInput from '../../AutocompleteInput';

  import { variableStore } from '../../../stores';

  import Switch from '../../Switch';

  import WarningSvg from '../../svg/warning.svg';

  // todo(pinussilvestrus): that could be refactored to something easier
  const INPUT_MAPPING_TYPES = [
    {
      id: 'process-variable',
      name: 'Assign from Process Variable',
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
      id: 'process-variable',
      name: 'Assign to Process Variable',
      descriptionProperty: 'processVariable'
    }
  ];


  // lifecycle //////////

  let lastSavedMappingType = 'process-variable';

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

  const handleCheckMapping = (checked) => {
    if (checked) {
      variable.mappingType = lastSavedMappingType === 'none' ? 'process-variable' : lastSavedMappingType;
    } else {
      lastSavedMappingType = variable.mappingType;
      variable.mappingType = 'none';
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
    return variable.mappingType &&
      variable.mappingType !== 'process-variable';
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
      ? `${isInputVariable(variable) ? '←' : '→'} ${variable[mappingType.descriptionProperty]}`
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

      <label>Task Variable Assignment</label>

      <Switch onCheck="{handleCheckMapping}" checked={hasMapping(variable) && variable.mappingType !== 'none'} />

      {#if !hasMapping(variable) || variable.mappingType === 'none'}
        <div class="hint">
          {`Without assignment, this variable is directly assigned from the process variable <${variable.name}>.`}
        </div>
      {:else}

        <label>Assignment Type</label>
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
          <textarea name="script-content" rows="5" bind:value={variable.inlineScript} spellcheck="false"></textarea>
        {:else if variable.mappingType === 'external-script'}
          <label>Format</label>
          <input autocomplete="off" name="script-format" bind:value={variable.scriptFormat} />

          <label>Resource</label>
          <input autocomplete="off" name="script-resource" bind:value={variable.externalScriptResource} />
        {:else if variable.mappingType === 'process-variable'}
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
                <p class="mapping-missing-hint">The assigned variable is not available in the process context!</p>
              {/if}
            </div>
        {/if}
      {/if}
    {:else}   
      <label>Task Variable Name</label>
      <input disabled name="name" bind:value={variable.name} />

      <label>Description</label>
      <textarea name="description" bind:value={variable.description} rows="3" disabled />

      <label>Assign to Process Variable</label>

      <Switch onCheck="{handleCheckMapping}" checked={hasMapping(variable) && variable.mappingType !== 'none'} />

      {#if !hasMapping(variable) || variable.mappingType === 'none'}
        <div class="hint">
          Without assignment, this variable will not be available in the process context.
        </div>
      {:else}

        <!-- <select name="type" bind:value={variable.mappingType}>
            {#each OUTPUT_MAPPING_TYPES as {id, name}}
              <option value={id} selected={variable.mappingType === id}>{name}</option>
            {/each}
        </select> -->

        {#if variable.mappingType === 'process-variable'}
          <label>Process Variable Name</label>
          <input 
            autocomplete="off" 
            name="process-variable" 
            bind:value={variable.processVariable} />
        {/if}
      {/if}
    {/if}
  </div>
</div>
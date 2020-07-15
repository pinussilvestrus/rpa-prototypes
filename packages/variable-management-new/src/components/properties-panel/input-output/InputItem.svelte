<script>
  import dom from 'domtastic';

  import { onMount } from 'svelte';

  import { filter, find, map } from 'min-dash';

  import './InputItem.scss';

  import AutocompleteInput from '../../AutocompleteInput';
  import Switch from '../../Switch';

  import { variableStore } from '../../../stores';

  const MAPPING_TYPES = [
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
      descriptionProperty: 'externalSriptResource'
    }
  ];

  const noop = () => {};


  // lifecycle //////////

  let lastSavedMappingType = 'process-variable';

  $: {
    if (input.mappingType === 'process-variable' && !input.processVariable) {
      input.processVariable = input.name;
    }
  }

  let availableOptions;
  onMount(async () => {
    variableStore.subscribe(list => {
  
      // do not use variables which are in this local scope
      const filtered = filter(list, (option) => {
        return option.writtenFrom.id !== elementId;
      });

      availableOptions = map(filtered, (item) => item.name);
    });
  });


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

  const handleDelete = () => {
    onDeleteItem('inputs', input.id);
  };

  const handleCheckMapping = (checked) => {
    if (checked) {
      input.mappingType = lastSavedMappingType === 'none' ? 'process-variable' : lastSavedMappingType;
    } else {
      lastSavedMappingType = input.mappingType;
      input.mappingType = 'none';
    }
  };


  // exports //////////

  export let input;
  export let elementId;
  export let onDeleteItem = noop;


  // helpers //////////

  const getHeaderDescription = (variable) => {
    if (!variable.mappingType) {
      return variable.description;
    }
  
    const mappingType = find(
      MAPPING_TYPES,
      (type) => type.id === variable.mappingType);
  
    if (!mappingType) {
      return variable.description;
    }

    return variable[mappingType.descriptionProperty]
      ? `← ${variable[mappingType.descriptionProperty]}`
      : variable.description;
  };

  const hasMapping = (variable) => {
    return variable.mappingType && variable.mappingType !== 'none';
  };

</script>

<div class="item input" id={`${input.id}`}>
    <div class="item-header input-header" on:click={handleTitleClick}>
      <p class="item-name"><i class="chevron"></i>{input.name}</p>
      <p class="item-description">{getHeaderDescription(input)}</p>
    </div>
    <div class="item-details input-details">
      <label>Task Variable Name</label>
      <input autocomplete="off" bind:value={input.name} />

      <label>Description</label>
      <textarea name="description" bind:value={input.description} spellcheck="false" />

      <label>Task Variable Assignment</label>

      <Switch onCheck="{handleCheckMapping}" checked={hasMapping(input)} />

      {#if !hasMapping(input)}
        <div class="hint">
          {`Without assignment, this variable is directly assigned from the process variable <${input.name}>`}.
        </div>
      {:else}

        <label>Assignment Type</label>
        <select name="type" bind:value={input.mappingType}>
            {#each MAPPING_TYPES as {id, name}}
              <option value={id}>{name}</option>
            {/each}
        </select>

        {#if input.mappingType === 'process-variable'}
          <label>Process Variable Name</label>
          <AutocompleteInput 
            id="{`${input.id}-value`}"
            name="mapping"
            type="text"
            bind:value={input.processVariable}
            items={availableOptions}
            defaultValue={input.name}
            placeholder="{`auto-filled by <${input.name}> process variable`}"
          />
        {:else if input.mappingType === 'constant-value'}
          <input autocomplete="off" name="constantValue" bind:value={input.constantValue} />
        {:else if input.mappingType === 'expression'}
          <textarea autocomplete="off" name="expression" bind:value={input.expression} spellcheck="false" />
        {:else if input.mappingType === 'inline-script'}
          <label>Format</label>
          <input autocomplete="off" name="script-format" bind:value={input.scriptFormat}  />

          <label>Script</label>
          <textarea name="script-content" rows="5" bind:value={input.inlineScript} spellcheck="false"></textarea>
        {:else if input.mappingType === 'external-script'}
          <label>Format</label>
          <input autocomplete="off" name="script-format" bind:value={input.scriptFormat} />

          <label>Resource</label>
          <input autocomplete="off" name="script-resource" bind:value={input.externalScriptResource} />
        {/if}

      {/if}

      <div class="action delete" on:click={handleDelete}>Delete</div>
    </div>
</div>
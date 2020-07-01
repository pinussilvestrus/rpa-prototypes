<script>
  import dom from 'domtastic';

  import { onMount } from 'svelte';

  import { filter, find, map } from 'min-dash';

  import './InputItem.scss';

  import AutocompleteInput from '../../AutocompleteInput';

  import { variableStore } from '../../../stores';

  const MAPPING_TYPES = [
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
      descriptionProperty: 'externalSriptResource'
    }
  ];

  const noop = () => {};

  // lifecycle //////////

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

    return variable[mappingType.descriptionProperty]
      ? `Mapping: ${variable[mappingType.descriptionProperty]}`
      : variable.description;
  };

</script>

<div class="item input" id={`${input.id}`}>
    <div class="item-header input-header" on:click={handleTitleClick}>
      <p class="item-name"><i class="chevron"></i>{input.name}</p>
      <p class="item-description">{getHeaderDescription(input)}</p>
    </div>
    <div class="item-details input-details">
      <label>Input Variable Name</label>
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
          items={availableOptions}
          defaultValue={input.name}
          placeholder="{`auto-filled by <${input.name}> process variable`}"
        />
      {:else if input.mappingType === 'constant-value'}
        <input autocomplete="off" name="constantValue" bind:value={input.constantValue} />
      {:else if input.mappingType === 'expression'}
        <textarea autocomplete="off" name="expression" bind:value={input.expression} />
      {:else if input.mappingType === 'inline-script'}
        <label>Format</label>
        <input autocomplete="off" name="script-format" bind:value={input.scriptFormat}  />

        <label>Script</label>
        <textarea name="script-content" rows="5" bind:value={input.inlineScript}></textarea>
      {:else if input.mappingType === 'external-script'}
        <label>Format</label>
        <input autocomplete="off" name="script-format" bind:value={input.scriptFormat} />

        <label>Resource</label>
        <input autocomplete="off" name="script-resource" bind:value={input.externalScriptResource} />
      {/if}

      <div class="action delete" on:click={handleDelete}>Delete Parameter</div>
    </div>
</div>
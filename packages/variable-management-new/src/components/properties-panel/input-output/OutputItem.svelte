<script>
  import dom from 'domtastic';

  import { find } from 'min-dash';

  import Switch from '../../Switch';

  import './OutputItem.scss';

  const MAPPING_TYPES = [
    {
      id: 'local-variable',
      name: 'Assign from Task Variable',
      descriptionProperty: 'localVariable'
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

  const noop = () => {};


  // lifecycle //////////

  let lastSavedMappingType = 'local-variable';

  $: {
    if (output.mappingType === 'local-variable' && !output.localVariable) {
      output.localVariable = output.name;
    }
  }


  // methods //////////

  const handleTitleClick = (event) => {
    const titleNode = dom(event.target),
          containerGfx = titleNode.closest('.output');

    if (containerGfx.hasClass('active')) {
      containerGfx.removeClass('active');
    } else {
      containerGfx.addClass('active');
    }
  };

  const handleDelete = () => {
    onDeleteItem('outputs', output.id);
  };

  const handleCheckMapping = (checked) => {
    if (checked) {
      output.mappingType = lastSavedMappingType === 'none-mapping' ? 'local-variable' : lastSavedMappingType;
    } else {
      lastSavedMappingType = output.mappingType;
      output.mappingType = 'none-mapping';
    }
  };


  // exports //////////

  export let output;
  export let onDeleteItem = noop;


  // helper //////////

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
    return variable.mappingType && variable.mappingType !== 'none-mapping';
  };

</script>

<div class="item output" id={`${output.id}`}>
    <div class="item-header output-header" on:click={handleTitleClick}>
      <p class="item-name"><i class="chevron"></i>{output.name}</p>
      <p class="item-description">{getHeaderDescription(output)}</p>
    </div>
    <div class="item-details output-details">
      <label>Process Variable Name</label>
      <input autocomplete="off" bind:value={output.name} />

      <label>Description</label>
      <textarea name="description" bind:value={output.description} spellcheck="false" />

      <label>Process Variable Assignment</label>

      <Switch onCheck="{handleCheckMapping}" checked={hasMapping(output)} />

      {#if !hasMapping(output)}
        <div class="hint">
          Without assignment, this process variable must be written within this task, e.g. by setVariable().
        </div>
      {:else}
        <label>Assignment Type</label>
        <select name="type" bind:value={output.mappingType}>
            {#each MAPPING_TYPES as {id, name}}
              <option value={id}>{name}</option>
            {/each}
        </select>

        {#if output.mappingType === 'constant-value'}
          <input autocomplete="off" name="constant-value" bind:value={output.constantValue} />
        {:else if output.mappingType === 'expression'}
          <textarea autocomplete="off" name="expression" bind:value={output.expression} spellcheck="false" />
        {:else if output.mappingType === 'inline-script'}
          <label>Format</label>
          <input autocomplete="off" name="script-format" bind:value={output.scriptFormat}  />

          <label>Script</label>
          <textarea name="script-content" rows="5" bind:value={output.inlineScript} spellcheck="false"></textarea>
        {:else if output.mappingType === 'external-script'}
          <label>Format</label>
          <input autocomplete="off" name="script-format" bind:value={output.scriptFormat} />

          <label>Resource</label>
          <input autocomplete="off" name="script-resource" bind:value={output.externalScriptResource} />
        {:else if output.mappingType === 'local-variable'}
          <label>Task Variable Name</label>
          <input autocomplete="off" name="local-variable" bind:value={output.localVariable} />

          <div class="hint">
            {`Task Variable <${output.localVariable}> must be written inside this task, e.g. by setVariableLocal().`}
          </div>
        {/if}
      {/if}

      <div class="action delete" on:click={handleDelete}>Delete</div>
    </div>
</div>
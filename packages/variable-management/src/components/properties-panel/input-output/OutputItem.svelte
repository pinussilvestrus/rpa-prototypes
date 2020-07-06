<script>
  import dom from 'domtastic';

  import { find } from 'min-dash';

  import {
    isStartEvent
  } from '../../../util/isElementType';

  import './OutputItem.scss';

  const MAPPING_TYPES = [
    {
      id: 'none',
      name: 'None'
    },
    {
      id: 'expression',
      name: 'Expression',
      descriptionProperty: 'expression'
    },
    {
      id: 'constant-value',
      name: 'Constant Value',
      descriptionProperty: 'constantValue'
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

  $: {
    if (!output.mappingType) {
      output.mappingType = 'process-variable';
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


  // exports //////////

  export let output;
  export let onDeleteItem = noop;
  export let elementType;


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
      ? `Mapping: ${variable[mappingType.descriptionProperty]}`
      : variable.description;
  };

</script>

<div class="item output" id={`${output.id}`}>
    <div class="item-header output-header" on:click={handleTitleClick}>
      <p class="item-name"><i class="chevron"></i>{output.name}</p>
      <p class="item-description">{getHeaderDescription(output)}</p>
    </div>
    <div class="item-details output-details">
      <label>Process Variable Name</label>
      <input autocomplete="off" name="name" bind:value={output.name} />

      <label>Description</label>
      <textarea name="description" bind:value={output.description} />

      {#if !isStartEvent(elementType)}
        <label>Output Mapping</label>
        <select name="type" bind:value={output.mappingType}>
            {#each MAPPING_TYPES as {id, name}}
              <option value={id}>{name}</option>
            {/each}
        </select>
      {/if}

      {#if output.mappingType === 'constant-value'}
        <input autocomplete="off" name="constant-value" bind:value={output.constantValue} />
      {:else if output.mappingType === 'expression'}
        <textarea autocomplete="off" name="expression" bind:value={output.expression} />
      {:else if output.mappingType === 'inline-script'}
        <label>Format</label>
        <input autocomplete="off" name="script-format" bind:value={output.scriptFormat}  />

        <label>Script</label>
        <textarea name="script-content" rows="5" bind:value={output.inlineScript}></textarea>
      {:else if output.mappingType === 'external-script'}
        <label>Format</label>
        <input autocomplete="off" name="script-format" bind:value={output.scriptFormat} />

        <label>Resource</label>
        <input autocomplete="off" name="script-resource" bind:value={output.externalScriptResource} />
      {/if}

      <div class="action delete" on:click={handleDelete}>Delete Parameter</div>
    </div>
</div>
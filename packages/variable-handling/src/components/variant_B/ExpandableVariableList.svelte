<script>
  import './ExpandableVariableList.scss';

  import dom from 'domtastic';


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

  export let id;
  export let title;
  export let variables = [];


  // helpers //////////

  const isInputVariable = (variable) => {
    return variable.type === 'input';
  };
  
</script>

<div class="expandable-list" id={id}>
  <div class="expandable-list-title">{title}</div>

  {#each variables as variable}
    <div class="variable" id={`variable-${variable.id}`}>
      <div class="variable-header" on:click={handleTitleClick}>
        <p class="variable-name"><i class="chevron"></i>{variable.name}</p>
        <p class="variable-description">{variable.description}</p>
      </div>
      <div class="variable-details">

        <!-- Type === Simple -->
        <label>Value</label>
        <input 
            name="value" 
            placeholder="{`${isInputVariable(variable) ? 'auto-filled by' : 'auto-written to'} <${variable.name}> process variable`}"
            value={variable.value} />
      </div>

    </div>
  {:else}
    <p class="empty">None</p>
  {/each}
</div>
<script>
  import dom from 'domtastic';

  import './OutputItem.scss';

  const noop = () => {};

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
</script>

<div class="item output" id={`${output.id}`}>
    <div class="item-header output-header" on:click={handleTitleClick}>
      <p class="item-name"><i class="chevron"></i>{output.name}</p>
      <p class="item-description">{output.description}</p>
    </div>
    <div class="item-details output-details">
      <label>Output Variable Name</label>
      <input autocomplete="off" name="name" bind:value={output.name} />

      <label>Description</label>
      <textarea name="description" bind:value={output.description} />

      <div class="action delete" on:click={handleDelete}>Delete Parameter</div>
    </div>
</div>
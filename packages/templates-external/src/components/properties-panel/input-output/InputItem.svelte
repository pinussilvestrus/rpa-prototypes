<script>
  import dom from 'domtastic';

  import './InputItem.scss';


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

  
  // exports //////////

  export let input;
</script>

<div class="item input" id={`${input.id}`}>
    <div class="item-header input-header" on:click={handleTitleClick}>
      <p class="item-name"><i class="chevron"></i>{input.name}</p>
      <p class="item-description">{input.description}</p>
    </div>
    <div class="item-details input-details">
     
    </div>
</div>
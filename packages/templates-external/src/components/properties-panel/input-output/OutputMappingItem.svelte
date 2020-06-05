<script>
  import dom from 'domtastic';

  import './OutputMappingItem.scss';


  // methods //////////

  const handleTitleClick = (event) => {
    const titleNode = dom(event.target),
          containerGfx = titleNode.closest('.output-mapping');

    if (containerGfx.hasClass('active')) {
      containerGfx.removeClass('active');
    } else {
      containerGfx.addClass('active');
    }
  };


  // exports //////////

  export let outputMapping;
</script>

<div class="item output-mapping" id={`${outputMapping.id}`}>
    <div class="item-header output-mapping-header" on:click={handleTitleClick}>
      <p class="item-name"><i class="chevron"></i>{outputMapping.name}</p>
      <p class="item-description">{outputMapping.description}</p>
    </div>
    <div class="item-details outputMapping-details">
     
    </div>
</div>
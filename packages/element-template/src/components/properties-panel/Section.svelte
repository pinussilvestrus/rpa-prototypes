<script>
    import dom from 'domtastic';

    const handleSectionTitleClick = (event) => {
      const titleNode = dom(event.target),
            id = titleNode.attr('id'),
            section = dom(`.section[data-title-ref="#${id}"]`);

      if (section.hasClass('hidden')) {
        titleNode.removeClass('inactive');
        section.removeClass('hidden');
      } else {
        titleNode.addClass('inactive');
        section.addClass('hidden');
      }
    };

    export let id;
    export let title;
</script>

<div 
  class="section-title" 
  id="{id}" 
  on:click={handleSectionTitleClick} >{title} <i></i></div>
<div class="section" data-title-ref="#{id}">
    <slot/>
</div>
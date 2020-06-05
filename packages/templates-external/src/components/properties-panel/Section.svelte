<script>
    // const handleSectionTitleClick = (event) => {
    //   const titleNode = dom(event.target),
    //         id = titleNode.attr('id'),
    //         section = dom(`.section[data-title-ref="#${id}"]`);

    //   if (section.hasClass('hidden')) {
    //     titleNode.removeClass('inactive');
    //     section.removeClass('hidden');
    //   } else {
    //     titleNode.addClass('inactive');
    //     section.addClass('hidden');
    //   }
    // };

    export let id;
    export let title;
    export let collection;
    export let onUpdateCollection;
    export let addComponent;
</script>

<div 
  class="section-title" 
  id="{id}">
    {title}
    <svelte:component this="{addComponent}" {collection} {onUpdateCollection}></svelte:component>
</div>
<div class="section" data-title-ref="#{id}">
    <slot/>
</div>
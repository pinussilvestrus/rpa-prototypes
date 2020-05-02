<script>
  import { onMount, afterUpdate } from 'svelte';

  import { forEach } from 'min-dash';

// import dom from 'domtastic';

  import getElement from '../util/getElement';

  import DiagramSVG from '../../resources/diagram.svg';

  import './Diagram.scss';

  const ELEMENTS = [
    'ServiceTask_1',
    'ServiceTask_2'
  ];

  // lifecycle //////////

  onMount(async () => {

    forEach(ELEMENTS, id => {
      const element = getElement(id);
      element.addClass('element');
      bindElementInteractions(element);
    });


  });

  afterUpdate(async () => {
  
    // remove selected from all decisions first
    forEach(ELEMENTS, id => {
      const dataElement = getElement(id);
      dataElement.removeClass('selected');
    });

  });


  // methods //////////

  function bindElementInteractions(element) {

    element.on('mouseover', () => {
      element.addClass('hover');
    });

    element.on('mouseout', () => {
      element.removeClass('hover');
    });

    element.on('click', event => {
      element.removeClass('hover');
      element.addClass('selected');
    });
  }

</script>

<div class="diagram">
  {@html DiagramSVG}
</div>

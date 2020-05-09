<script>
  import { onMount, afterUpdate } from 'svelte';

  import { forEach } from 'min-dash';

  import getElement from '../util/getElement';

  import DiagramSVG from '../../resources/diagram.svg';

  import './Diagram.scss';

  const ELEMENTS = [
    {
      id: 'ServiceTask_1',
      name: 'Task 1'
    },
    {
      id: 'ServiceTask_2',
      name: 'Task 2'
    }
  ];

  const noop = () => {};

  // lifecycle //////////

  onMount(async () => {

    // (1) bind hover and selection handlers
    forEach(ELEMENTS, ({ id }) => {
      const element = getElement(id);
      element.addClass('element');
      bindElementInteractions(element);
    });

    // (2) initialize properties binding
    forEach(ELEMENTS, element => {
      bindOpenPanel(element);
    });

  });

  afterUpdate(async () => {
    resetSelection();
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
      resetSelection();

      element.removeClass('hover');
      element.addClass('selected');
    });
  }

  function bindOpenPanel(element) {

    const gfx = getElement(element.id);

    gfx.on('click', () => {
      onOpenProperties(element);
    });
  }

  function resetSelection() {
    forEach(ELEMENTS, ({ id }) => {
      const dataElement = getElement(id);
      dataElement.removeClass('selected');
    });
  }


  // exports  //////////
  export let onOpenProperties = noop;

</script>

<div class="diagram">
  {@html DiagramSVG}
</div>

<script>
  import { afterUpdate } from 'svelte';

  import { forEach } from 'min-dash';

  import getElement from '../util/getElement';

  import DiagramSVG from '../../resources/diagram.svg';

  import './Diagram.scss';

  const noop = () => {};

  // lifecycle //////////

  afterUpdate(async () => {

    // todo(pinussilvestrus): remove old bindings, especially after id update

    // (1) reset selections from all elements
    resetSelection();

    // (2) bind hover and selection handlers
    forEach(elements, ({ id }) => {
      const element = getElement(id);
      element.addClass('element');
      bindElementInteractions(element);
    });

    // (3) initialize properties binding
    forEach(elements, element => {
      bindOpenPanel(element);
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
      resetSelection();

      element.removeClass('hover');
      element.addClass('selected');
    });
  }

  function bindOpenPanel(element) {

    const gfx = getElement(element.id);

    gfx.on('click', () => {
      onOpenProperties(element.id);
    });
  }

  function resetSelection() {
    forEach(elements, ({ id }) => {
      const dataElement = getElement(id);
      dataElement.removeClass('selected');
    });
  }


  // exports  //////////
  export let onOpenProperties = noop;
  export let elements = [];

</script>

<div class="diagram">
  {@html DiagramSVG}
</div>

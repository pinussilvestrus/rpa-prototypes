<script>
  import { afterUpdate } from 'svelte';

  import { forEach } from 'min-dash';

  import getElement from '../util/getElement';

  import DiagramSVG from '../../resources/diagram.svg';

  import './Diagram.scss';

  const noop = () => {};

  let currentSelection;


  // lifecycle //////////

  afterUpdate(async () => {

    // (1) reset selections from all elements
    resetSelection();

    // (2) bind hover and selection handlers
    // (3) initialize properties panel binding
    // todo(pinussilvestrus): prevent add a new binding on every update
    forEach(elements, (element) => {
      bindElementInteractions(element);
      bindOpenPanel(element);
    });
  });


  // methods //////////

  const bindElementInteractions = (element, unbind = false) => {
    const gfx = getElement(element.id);

    gfx.addClass('element');

    gfx[unbind ? 'off' : 'on']('mouseover', () => {
      gfx.addClass('hover');
    });

    gfx[unbind ? 'off' : 'on']('mouseout', () => {
      gfx.removeClass('hover');
    });

    gfx[unbind ? 'off' : 'on']('click', event => {
      currentSelection = element.id;
      resetSelection();

      gfx.removeClass('hover');
      gfx.addClass('selected');
    });
  };

  const bindOpenPanel = (element, unbind = false) => {
    const gfx = getElement(element.id);

    gfx[unbind ? 'off' : 'on']('click', (event) => {
      onOpenProperties(element.id);

      event.stopPropagation();
      event.preventDefault();
    });
  };

  const resetSelection = () => {
    forEach(elements, ({ id }) => {
      if (id === currentSelection) {
        return;
      }

      const dataElement = getElement(id);
      dataElement.removeClass('selected');
    });
  };

  const handleProcessClick = () => {
    onOpenProperties('Process_1');
    currentSelection = null;
    resetSelection();
  };


  // exports  //////////

  export let onOpenProperties = noop;
  export let elements = [];

</script>

<div class="diagram" on:click={handleProcessClick}>
  {@html DiagramSVG}
</div>

<script>
  import { onMount, afterUpdate } from 'svelte';

  import { forEach } from 'min-dash';

  // import dom from 'domtastic';

  import MicroModal from 'micromodal';

  import getElement from '../util/getElement';

  import DiagramSVG from '../../resources/diagram.svg';

  import CatalogModal from './CatalogModal';

  import './Diagram.scss';

  const ELEMENTS = [
    'ServiceTask_1',
    'ServiceTask_2'
  ];

  const modalId = 'catalog-modal';

  // lifecycle //////////

  onMount(async () => {

    // (1) bind hover and selection handlers
    forEach(ELEMENTS, id => {
      const element = getElement(id);
      element.addClass('element');
      bindElementInteractions(element);
    });

    // (2) initialize modal
    MicroModal.init();
    forEach(ELEMENTS, id => {
      const element = getElement(id);
      bindOpenModal(element);
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

  function bindOpenModal(element) {
    element.attr('data-micromodal-trigger', modalId);
    element.on('dblclick', () => {
      element.removeClass('hover');
      element.addClass('selected');

      MicroModal.show(modalId);
    });
  }

</script>

<div class="diagram">
  {@html DiagramSVG}
</div>

<CatalogModal {modalId} />

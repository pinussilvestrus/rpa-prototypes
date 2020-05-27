<script>
  import { find, findIndex } from 'min-dash';

  import dom from 'domtastic';

  import TextUtil from 'diagram-js/lib/util/Text';

  import Diagram from './Diagram.svelte';
  import PropertiesPanel from './properties-panel/PropertiesPanel.svelte';

  import getElement from '../util/getElement';

  import './BasicEditor.scss';

  const LABEL_STYLE = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px'
  };

  const textUtil = new TextUtil({
    style: LABEL_STYLE,
    size: { width: 100 }
  });

  let currentElement = null;

  const handleOpenProperties = (elementOrId) => {
    if (typeof elementOrId === 'string') {
      elementOrId = find(elements, e => e.id === elementOrId);
    }

    if (!elementOrId) {
      return;
    }
  
    currentElement = elementOrId;

    currentElement.currentVariable = null;
  };

  const handleNameChanged = (element, name) => {
    const gfx = getElement(element.id);

    if (!gfx) {
      return;
    }

    // (1) find and delete present text element
    gfx.find('text').remove();

    // (2) create new text
    const newText = textUtil.createText(name, {
      box: { width: 100, height: 80 },
      align: 'center-middle',
      padding: 5
    });

    dom(newText).addClass('.djs-label');

    // (3) append
    gfx.find('.djs-visual').append(newText);
  };

  const handleIdChanged = (element, id) => {
    const gfx = getElement(element.id);

    if (!gfx) {
      return;
    }

    gfx.attr('data-element-id', id);
  };

  const handleUpdateProperties = (elementId, attrs = {}) => {
    const idx = findIndex(elements, e => e.id === elementId);

    if (idx < 0) {
      return;
    }

    // update id on gfx if necessary
    if (attrs.id) {
      handleIdChanged(elements[idx], attrs.id);
    }

    elements[idx] = {
      ...elements[idx],
      ...attrs
    };

    // update name on gfx if necessary
    if (attrs.name) {
      handleNameChanged(elements[idx], attrs.name);
    }

    handleOpenProperties(elements[idx]);
  };


  // exports //////////

  export let elements = [];
  export let templates = [];
  export let variableListComponent;
  export let variableDetailsComponent;

</script>

<div class="editor-container">
  <Diagram 
    onOpenProperties={handleOpenProperties} 
    bind:elements={elements} />
  <PropertiesPanel 
    element={currentElement} 
    {templates}
    {variableListComponent}
    {variableDetailsComponent}
    onPropertiesChanged={handleUpdateProperties} />
</div>

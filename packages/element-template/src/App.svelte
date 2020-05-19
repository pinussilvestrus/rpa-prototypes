<script>
  import { find, findIndex } from 'min-dash';

  import dom from 'domtastic';

  import TextUtil from 'diagram-js/lib/util/Text';

  import Diagram from './components/Diagram.svelte';
  import PropertiesPanel from './components/PropertiesPanel.svelte';

  import getElement from './util/getElement';

  import './App.scss';

  const LABEL_STYLE = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px'
  };

  const textUtil = new TextUtil({
    style: LABEL_STYLE,
    size: { width: 100 }
  });

  let elements = [
    {
      id: 'ServiceTask_1',
      name: 'Task 1',
      templateId: null
    },
    {
      id: 'ServiceTask_2',
      name: 'Task 2',
      templateId: null
    }
  ];

  let currentElement = null;

  const handleOpenProperties = (elementOrId) => {
    if (typeof elementOrId === 'string') {
      elementOrId = find(elements, e => e.id === elementOrId);
    }
  
    currentElement = elementOrId;
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

  const handleUpdateProperties = (elementId, attrs = {}) => {
    const idx = findIndex(elements, e => e.id === elementId);

    if (idx < 0) {
      return;
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

</script>

<div class="diagram-container">
  <Diagram onOpenProperties={handleOpenProperties} {elements} />
  <PropertiesPanel element={currentElement} onPropertiesChanged={handleUpdateProperties} />
</div>

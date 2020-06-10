<script>
  import { find, findIndex, forEach } from 'min-dash';

  import { onMount, afterUpdate } from 'svelte';

  import dom from 'domtastic';

  import TextUtil from 'diagram-js/lib/util/Text';

  import Diagram from './Diagram.svelte';
  import PropertiesPanel from './properties-panel/PropertiesPanel.svelte';
  import Toolbar from './Toolbar.svelte';

  import getElement from '../util/getElement';

  import { variableStore } from '../stores';

  import { PROCESS_INPUT_VARS } from '../../resources/data';

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


  // lifecycle //////////

  onMount(async () => {
    variableStore.set(PROCESS_INPUT_VARS.slice(0, PROCESS_INPUT_VARS.length));
  });


  afterUpdate(async () => {
  
    // restore variable store
    variableStore.reset();
    variableStore.set(PROCESS_INPUT_VARS.slice(0, PROCESS_INPUT_VARS.length));

    // collect output variables from process data
    forEach(elements, (element) => {
      forEach([ ...element.outputs, ...element.outputMappings ], (output) => {
        variableStore.addVariable({
          id: output.id,
          value: output.name
        });
      });
    });
  });



  // methods //////////

  const handleOpenProperties = (elementOrId) => {
    if (typeof elementOrId === 'string') {
      elementOrId = find(elements, e => e.id === elementOrId);
    }

    if (!elementOrId) {
      return;
    }
  
    // wait a bit for some changes to be made in rest of properties (very dirty stuff)
    // todo(pinussilvestrus): refactor me
    setTimeout(function() {
      currentElement = elementOrId;
    }, 100);
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
  export let selectTemplateComponent;

</script>

<Toolbar />
<div class="editor-container">
  <Diagram 
    onOpenProperties={handleOpenProperties} 
    bind:elements={elements} />
  <PropertiesPanel 
    bind:element={currentElement} 
    {templates}
    {variableListComponent}
    {variableDetailsComponent}
    {selectTemplateComponent}
    onPropertiesChanged={handleUpdateProperties} />
</div>

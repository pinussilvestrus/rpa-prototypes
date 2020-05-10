<script>
  import { find, findIndex } from 'min-dash';

  import Diagram from './components/Diagram.svelte';
  import PropertiesPanel from './components/PropertiesPanel.svelte';

  import './App.scss';

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

  const handleUpdateProperties = (elementId, attrs) => {
    const idx = findIndex(elements, e => e.id === elementId);

    if (idx < 0) {
      return;
    }

    elements[idx] = {
      ...elements[idx],
      ...attrs
    };

    handleOpenProperties(elements[idx]);
  };

</script>

<div class="diagram-container">
  <Diagram onOpenProperties={handleOpenProperties} {elements} />
  <PropertiesPanel element={currentElement} onPropertiesChanged={handleUpdateProperties} />
</div>

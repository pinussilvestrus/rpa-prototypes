<script>
  import Diagram from './components/Diagram.svelte';
  import PropertiesPanel from './components/PropertiesPanel.svelte';

  import './App.scss';

  let currentElement = null;

  const handleOpenProperties = (element) => {
    currentElement = element;
  };

</script>

<div class="diagram-container">
  <Diagram onOpenProperties={handleOpenProperties} />
  <PropertiesPanel element={currentElement} />
</div>

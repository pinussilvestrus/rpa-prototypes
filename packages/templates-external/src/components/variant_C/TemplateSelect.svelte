<script>
  import dom from 'domtastic';

  import MicroModal from 'micromodal';

  import { onMount } from 'svelte';

  import CatalogModal from './CatalogModal';

  const modalId = 'catalog-modal';

  // lifecycle //////////

  onMount(async () => {
    MicroModal.init();
  });


  // methods //////////

  const handleSelect = (event) => {
    const selectNode = dom(event.target),
          value = selectNode.val();

    if (value === 'bot-template') {
  
      // open  modal
      MicroModal.show(modalId);
    } else {
      handleTemplateChanged(event);
    }
  };


  // exports //////////

  export let templates;
  export let element;
  export let handleTemplateChanged;
</script>


<label>Implementation</label>
<!-- svelte-ignore a11y-no-onchange -->
<select id="element-template" on:change="{handleSelect}">
  <option></option>
  <option value="bot-template">Select From Worker Catalog ...</option>
  <optgroup label="Default Implementation Types">
    <option>Java Class</option>
    <option>Expression</option>
    <option>Delegate Expression</option>
    <option>External</option>
    <option>Connector</option>
  </optgroup>
</select>

<CatalogModal {modalId} />
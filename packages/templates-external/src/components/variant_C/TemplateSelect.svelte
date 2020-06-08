<script>
  import dom from 'domtastic';

  import { forEach } from 'min-dash';

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

  const handleModalClose = (selection) => {
    const selectNode = dom('select#element-template');
  
    // (1) close Modal
    MicroModal.close(modalId);

    // (2) early return if no selection was made
    const templateId = selection.templateId;
  
    if (!templateId) {
      return selectNode.val(null);
    }

    // (3) update visual selection
    selectNode.val(templateId);

    // (4) notify selection
    handleTemplateChanged({
      target: selectNode[0]
    });
  };


  // exports //////////

  export let templates;
  export let handleTemplateChanged;
</script>


<label>Implementation</label>
<!-- svelte-ignore a11y-no-onchange -->
<select id="element-template" on:change="{handleSelect}">
  <option></option>
  {#each templates as template}
    <option hidden value="{template.id}">{template.name}</option>
  {/each}
  <option value="bot-template">Select From Worker Catalog ...</option>
  <optgroup label="Default Implementation Types">
    <option>Java Class</option>
    <option>Expression</option>
    <option>Delegate Expression</option>
    <option>External</option>
    <option>Connector</option>
  </optgroup>
</select>

<CatalogModal {templates} {modalId} onClose={handleModalClose}  />
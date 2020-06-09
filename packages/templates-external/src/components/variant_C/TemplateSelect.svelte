<script>
  import dom from 'domtastic';

  import MicroModal from 'micromodal';

  import { onMount } from 'svelte';

  import CatalogModal from './CatalogModal';

  const modalId = 'catalog-modal';

  const noop = () => {};

  // lifecycle //////////

  onMount(async () => {
    MicroModal.init();
  });

  $: {
  
    // values can be hidden
    if (element.templateId) {
      dom('#element-template').val(element.templateId);
    } else {
      dom('#element-template').val(null);
    }
  }


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

    // (2) check for template id
    const templateId = selection.templateId;
  
    // (3) update select visually
    if (!templateId) {
      selectNode.val(null);
    } else {
      selectNode.val(templateId);
    }

    // (4) notify selection
    handleTemplateChanged({
      target: selectNode[0]
    });
  };


  // exports //////////

  export let templates;
  export let element;
  export let handleTemplateChanged = noop;
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
<script>
    import dom from 'domtastic';

    import './CatalogModal.scss';

    const noop = () => {};

    let formNode;

    // methods //////////

    const handleSelectTemplate = () => {
      const checkedOption = findCheckedOption(formNode, 'templateId');

      onClose({
        templateId: checkedOption.val()
      });
    };


    // exports //////////

    export let modalId = '';
    export let onClose = noop;
    export let templates = [];


    // helpers //////////

    const findCheckedOption = (form, name) => {
      return dom(form).find(`input[name="${name}"]:checked`);
    };
</script>
  
<div class="modal" id="{modalId}" aria-hidden="true">
  <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="{modalId}-title">
    <header class="modal-header">
      <p class="modal-title" id="{modalId}-title">
        Worker Catalog
      </p>
      <button class="modal-close" aria-label="Close modal" data-micromodal-close></button>
    </header>
      <main class="modal-content" id="{modalId}-content">
        <form bind:this={formNode}>
          {#each templates as template}
            <div class="worker">
              <input type="radio" id="{template.id}" name="templateId" value="{template.id}">
              <label for="{template.id}">{template.name}</label><br>
            </div>
          {/each}
        </form>
    </main>
    <footer class="modal-footer">
      <button class="btn btn-secondary" on:click={onClose} aria-label="Close this dialog window">Close</button>
      <button class="btn btn-primary" on:click={handleSelectTemplate} aria-label="Apply Template">Apply</button>
    </footer>
  </div>
</div>
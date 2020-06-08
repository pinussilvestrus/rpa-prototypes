<script>
    import './CatalogModal.scss';

    const noop = () => {};

    // methods //////////

    const handleSelectTemplate = () => {
      onClose({
        templateId: 'generate-pdf-quote'
      });
    };


    // exports //////////

    export let modalId = '';
    export let onClose = noop;
    export let templates = [];
</script>
  
<div class="modal" id="{modalId}" aria-hidden="true">
  <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="{modalId}-title">
    <header class="modal-header">
      <p class="modal-title" id="{modalId}-title">
        Choose from Worker Catalog
      </p>
      <button class="modal-close" aria-label="Close modal" data-micromodal-close></button>
    </header>
      <main class="modal-content" id="{modalId}-content">
        <form>
          TODO
        </form>
    </main>
    <footer class="modal-footer">
      <button class="btn btn-primary" on:click={handleSelectTemplate} aria-label="Save Choice">Select</button>
      <button class="btn btn-secondary" on:click={onClose} aria-label="Close this dialog window">Close</button>
    </footer>
  </div>
</div>
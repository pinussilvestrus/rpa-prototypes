<script>
    import './CatalogModal.scss';

    const workers = [
      {
        idx: 0,
        name: 'Get Price'
      },
      {
        idx: 1,
        name: 'Calculate Price'
      }
    ];

    export let modalId = '';
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
          {#each workers as {idx, name}}
            <div class="worker">
              <input type="radio" id="{idx}" name="worker" value="{name}">
              <label for="{idx}">{name}</label><br>
            </div>
          {/each}
        </form>
    </main>
    <footer class="modal-footer">
      <button class="btn btn-primary" data-micromodal-close aria-label="Save Choice">Select</button>
      <button class="btn btn-secondary" data-micromodal-close aria-label="Close this dialog window">Close</button>
    </footer>
  </div>
</div>
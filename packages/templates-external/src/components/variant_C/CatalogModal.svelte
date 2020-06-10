<script>
    import dom from 'domtastic';

    import { debounce, filter } from 'min-dash';

    import './CatalogModal.scss';

    const noop = () => {};

    let formNode;

    let filteredTemplates = [];

    $: {
      if (templates.length) {
        filteredTemplates = templates;
      }
    }

    // methods //////////

    const handleSelectTemplate = () => {
      const checkedOption = findCheckedOption(formNode, 'templateId');

      onClose({
        templateId: checkedOption.val()
      });
    };

    const handleSearch = (event) => {
      const inputNode = dom(event.target),
            searchValue = inputNode.val();

      filteredTemplates = filter(templates, t => {

        // todo(pinussilvestrus): also for topic, variables, description ?

    
        // (1) search in name (lower and upper case)
        if (
          t.name.includes(searchValue) ||
          t.name.includes(toTitleCase(searchValue))
        ) {
          return true;
        }

        // (2) search in description (lower and upper case)
        if (
          t.description.includes(searchValue)
          || t.description.includes(toTitleCase(searchValue))
        ) {
          return true;
        }

        return false;
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

    const toTitleCase = (string) => {
      return string.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    };
</script>
  
<div class="modal" id="{modalId}" aria-hidden="true">
  <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="{modalId}-title">
    <header class="modal-header">
      <p class="modal-title" id="{modalId}-title">
        Worker Catalog
      </p>
      <button class="modal-close" aria-label="Close modal" on:click={onClose}></button>
    </header>
      <main class="modal-content" id="{modalId}-content">
        <input 
          class="search-bar" 
          on:input={debounce(handleSearch, 300)}
          placeholder="search for item ..." />

        <form bind:this={formNode}>
          {#each filteredTemplates as template}
            <div class="worker">
              <input type="radio" id="{template.id}" name="templateId" value="{template.id}">
              <label for="{template.id}">
                <div class="worker-name">{template.name}</div>
                <div class="worker-description">{template.description}</div>
              </label><br>
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
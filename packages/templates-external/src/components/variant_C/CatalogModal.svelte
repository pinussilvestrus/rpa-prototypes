<script>
    import dom from 'domtastic';

    import { debounce, filter } from 'min-dash';

    import './CatalogModal.scss';

    import SearchSvg from '../svg/search.svg';

    const noop = () => {};

    let formNode;

    let filteredTemplates = [];

    $: {
      if (isOpen) {

        // (1) reset filtered templates
        filteredTemplates = templates;

        // (2) reset search bar
        const searchBar = dom('.search-bar input');
        searchBar && searchBar.val(null);
        searchBar && searchBar[0].focus();
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

        // todo(pinussilvestrus): also for topic, variables, ...?

    
        // (1) search in name
        if (includesLowerCase(t.name, searchValue)) {
          return true;
        }

        // (2) search in description (lower and upper case)
        if (includesLowerCase(t.description, searchValue)) {
          return true;
        }

        return false;
      });
    };


    // exports //////////

    export let modalId = '';
    export let onClose = noop;
    export let isOpen = false;
    export let templates = [];


    // helpers //////////

    const findCheckedOption = (form, name) => {
      return dom(form).find(`input[name="${name}"]:checked`);
    };

    const includesLowerCase = (a, b) => {
      return a.toLowerCase().includes(b.toLowerCase());
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
        <div class="search-bar">
          <span class="icon"> {@html SearchSvg}</span>
          <input 
            on:input={debounce(handleSearch, 300)}
            placeholder="search for item ..." />
        </div>

        <form bind:this={formNode}>
          {#each filteredTemplates as template}
            <div class="worker">
              <input type="radio" id="{template.id}" name="templateId" value="{template.id}">
              <label for="{template.id}">
                <div class="worker-name">{template.name}</div>
                <div class="worker-description">{template.description}</div>
              </label><br>
            </div>
          {:else}
            <div class="empty">No worker available.</div>
          {/each}
        </form>
    </main>
    <footer class="modal-footer">
      <button class="btn btn-secondary" on:click={onClose} aria-label="Close this dialog window">Close</button>
      <button class="btn btn-primary" on:click={handleSelectTemplate} aria-label="Apply Template">Apply</button>
    </footer>
  </div>
</div>
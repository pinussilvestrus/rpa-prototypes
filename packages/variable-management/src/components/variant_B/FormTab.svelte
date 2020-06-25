<script>
  import { findIndex } from 'min-dash';

  import dom from 'domtastic';

  import { afterUpdate } from 'svelte';

  import Section from '../properties-panel/Section';

  import AddFormField from './AddFormField';

  import FormField from './FormField';

  import './FormTab.scss';

  let lastAddedItem = null;
  let formTabNode = null;

  // lifecycle //////////

  afterUpdate(async () => {

    // expand last added item if available, collapse all other
    if (lastAddedItem) {
      dom(formTabNode).find('.form-field').removeClass('active');

      dom(formTabNode).find(`.form-field#${lastAddedItem}`).addClass('active');
      lastAddedItem = null;
    }
  });


  // methods //////////

  const handleUpdateCollection = (key, collection, hints = {}) => {
    const {
      lastAddedItemIdx
    } = hints;

    element = {
      ...element,
      [key]: collection
    };


    // store last added item for later operations
    if (lastAddedItemIdx) {
      lastAddedItem = lastAddedItemIdx;
    }
  };

  const handleDeleteItem = (type, id) => {
    let collection = element[type];

    const itemIdx = findIndex(collection, c => c.id === id);

    if (itemIdx >= 0) {
      collection.splice(itemIdx, 1);
      handleUpdateCollection(type, collection);
    }
  };



  // exports //////////

  export let element;
  export let hidden = true;
</script>

<div class="form-tab" class:hidden={hidden} bind:this="{formTabNode}">

    <Section>
        <label>Form Key</label>
        <input name="form-key" bind:value={element.formKey} autocomplete="off" />
    </Section>

    <Section 
          id="form-fields" 
          title="Form Fields" 
          collection={element.outputs}
          onUpdateCollection={handleUpdateCollection}
          addComponent={AddFormField}>
            {#each element.outputs as formField}
              <FormField 
                {formField} 
                onDeleteItem={handleDeleteItem} />
            {:else}
              <p class="empty">None</p>
            {/each}
      </Section>
</div>
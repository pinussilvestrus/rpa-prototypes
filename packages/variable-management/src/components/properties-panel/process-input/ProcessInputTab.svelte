<script>
  import { findIndex } from 'min-dash';

  import dom from 'domtastic';

  import { afterUpdate } from 'svelte';

  import Section from '../Section';

  import AddFormField from './AddFormField';

  import FormField from './FormField';

  import './ProcessInputTab.scss';

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

<div class="process-input-tab" class:hidden={hidden} bind:this="{formTabNode}">
  <Section 
    id="form-fields" 
    title="Input Variables" 
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

    <Section id="form-details" title="Form Details">
      <label>Form Key</label>
      <input name="form-key" bind:value={element.formKey} autocomplete="off" />

      <!-- todo(pinussilvestrus): fill business key from variables -->
      <label>Business Key</label>
      <input name="business-key" bind:value={element.businessKey} autocomplete="off" />
    </Section>
</div>
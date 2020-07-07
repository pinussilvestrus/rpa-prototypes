<script>
    import { findIndex } from 'min-dash';

    import { afterUpdate } from 'svelte';

    import dom from 'domtastic';
    
    import Section from '../Section';

    import AddInput from './AddInput';
    import AddOutput from './AddOutput';

    import InputItem from './InputItem';
    import OutputItem from './OutputItem';

    import './InputOutputTab.scss';

    let lastAddedItem = null;


    // lifecycle //////////
    
    afterUpdate(async () => {

      // expand last added item if available, collapse all other
      if (lastAddedItem) {
        dom('.item').removeClass('active');

        dom(`#${lastAddedItem}`).addClass('active');
        lastAddedItem = null;
      }
    });


    // methods

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

<div class="input-output-tab" class:hidden={hidden}>

    <Section 
        id="data-inputs" 
        title="Input Variables" 
        collection={element.inputs}
        onUpdateCollection={handleUpdateCollection}
        addComponent={AddInput}>
          {#each element.inputs as input}
            <InputItem 
              {input} 
              onDeleteItem={handleDeleteItem} 
              elementId={element.id} />
          {:else}
            <p class="empty">None</p>
          {/each}
    </Section>

    <Section 
        id="data-outputs" 
        title="Output Variables"
        collection={element.outputs}
        onUpdateCollection={handleUpdateCollection}
        addComponent={AddOutput}>
          {#each element.outputs as output}
            <OutputItem {output} onDeleteItem={handleDeleteItem} elementType={element.type} />
          {:else}
            <p class="empty">None</p>
          {/each}
    </Section>
</div>
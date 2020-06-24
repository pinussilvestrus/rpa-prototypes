<script>
    import { findIndex } from 'min-dash';

    import { afterUpdate } from 'svelte';

    import dom from 'domtastic';
    
    import Section from '../Section';

    import AddInput from './AddInput';
    import AddOutput from './AddOutput';
    import AddOutputMapping from './AddOutputMapping';

    import InputItem from './InputItem';
    import OutputItem from './OutputItem';
    import OutputMappingItem from './OutputMappingItem';

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
    export let onlyOutputs = false;
</script>

<div class="input-output-tab" class:hidden={hidden}>

    {#if !onlyOutputs}
      <Section 
          id="data-inputs" 
          title="Data Input Specification" 
          collection={element.inputs}
          onUpdateCollection={handleUpdateCollection}
          addComponent={AddInput}>
            {#each element.inputs as input}
              <InputItem 
                {input} 
                onDeleteItem={handleDeleteItem} 
                ignoredSuggestions={[...element.outputs, ...element.outputMappings ]} />
            {:else}
              <p class="empty">None</p>
            {/each}
      </Section>
    {/if}

    <Section 
        id="data-outputs" 
        title="Data Output Specification"
        collection={element.outputs}
        onUpdateCollection={handleUpdateCollection}
        addComponent={AddOutput}>
          {#each element.outputs as output}
            <OutputItem {output} onDeleteItem={handleDeleteItem} />
          {:else}
            <p class="empty">None</p>
          {/each}
    </Section>

    {#if !onlyOutputs}
      <Section 
          id="output-mappings" 
          title="Output Transformation"
          collection={element.outputMappings}
          onUpdateCollection={handleUpdateCollection}
          addComponent={AddOutputMapping}>
            {#each element.outputMappings as outputMapping}
              <OutputMappingItem {outputMapping} onDeleteItem={handleDeleteItem} />
            {:else}
              <p class="empty">None</p>
            {/each}
      </Section>
    {/if}
</div>
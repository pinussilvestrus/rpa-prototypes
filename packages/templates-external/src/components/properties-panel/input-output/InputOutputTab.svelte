<script>
    import Section from '../Section';

    import AddInput from './AddInput';
    import AddOutput from './AddOutput';
    import AddOutputMapping from './AddOutputMapping';

    import InputItem from './InputItem';
    import OutputItem from './OutputItem';
    import OutputMappingItem from './OutputMappingItem';

    import './InputOutputTab.scss';


    // methods

    const handleUpdateCollection = (key, collection) => {
      element = {
        ...element,
        [key]: collection
      };
    };


    // exports //////////

    export let element;
    export let hidden = true;
</script>

<div class="input-output-tab" class:hidden={hidden}>
    <Section 
        id="data-inputs" 
        title="Data Input Specification" 
        collection={element.inputs}
        onUpdateCollection={handleUpdateCollection}
        addComponent={AddInput}>
          {#each element.inputs as input}
            <InputItem {input} />
          {:else}
            <p class="empty">None</p>
          {/each}
    </Section>

    <Section 
        id="data-outputs" 
        title="Data Output Specification"
        collection={element.outputs}
        onUpdateCollection={handleUpdateCollection}
        addComponent={AddOutput}>
          {#each element.outputs as output}
            <OutputItem {output} />
          {:else}
            <p class="empty">None</p>
          {/each}
    </Section>

    <Section 
        id="output-mappings" 
        title="Output Mapping"
        bind:collection={element.outputMappings}
        onUpdateCollection={handleUpdateCollection}
        addComponent={AddOutputMapping}>
          {#each element.outputMappings as outputMapping}
            <OutputMappingItem {outputMapping} />
          {:else}
            <p class="empty">None</p>
          {/each}
    </Section>
</div>
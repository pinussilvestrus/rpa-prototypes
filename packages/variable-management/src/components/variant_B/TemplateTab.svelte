<script>
    
    import Section from '../properties-panel/Section';
    import VariableList from '../properties-panel/element-template/VariableList';


    // exports //////////

    export let hidden = true;
    export let element;
</script>

<div class="template-tab" class:hidden={hidden}>
    {#if element.template}
        <Section id="template" title="{element.template.name}">

        <label>Description</label>
        <textarea disabled value="{element.template.description}"></textarea>

        <label>Topic</label>
        <input disabled value="{element.template.topic}"/>

        <VariableList 
            id="input-select"
            title="Input Variables"
            elementId={element.id}
            bind:variables={element.template.inputs} />

        <VariableList
            id="output-select"
            title="Output Variables"
            bind:variables={element.template.outputs} />

        </Section>
    {/if}  
</div>
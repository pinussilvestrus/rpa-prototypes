<script>
    import Section from '../properties-panel/Section';
    import VariableList from '../properties-panel/element-template/VariableList';

    import XSvg from '../svg/x.svg';

    import './TemplateTab.scss';

    const noop = () => {};


    // methods //////////

    const handleClick = () => {
      handleTemplateChanged('');
    };


    // exports //////////

    export let hidden = true;
    export let element;
    export let handleTemplateChanged = noop;
</script>

<div class="template-tab" class:hidden={hidden}>
    {#if element.template}
        <Section id="template" title="{element.template.name}">

        <div class="unlink-template" on:click={handleClick}>{@html XSvg}</div>

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
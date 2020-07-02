<script>
    import VariableList from '../properties-panel/element-template/VariableList';

    import Section from '../properties-panel/Section';

    export let element;
</script>

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
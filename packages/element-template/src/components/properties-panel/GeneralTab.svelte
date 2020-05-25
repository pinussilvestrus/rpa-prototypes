<script>
    import { debounce } from 'min-dash';

    import Section from './Section';
    import VariableDetails from './VariableDetails';
    import VariableList from './VariableList';

    const noop = () => {};

    export let handlePropertyChanged = noop;
    export let handleTemplateChanged = noop;
    export let element;
    export let templates;
    export let handleVariableSelect = noop;
    export let handleVariableChanged = noop;
</script>


<Section id="general" title="General">
    <label>Id</label>
    <input name="id" on:change="{handlePropertyChanged}" value="{element.id}" />

    <label>Name</label>
    <input name="name" on:input="{debounce(handlePropertyChanged, 500)}" value="{element.name}" />

    <label>Element Template</label>
    <select id="element-template" on:change="{handleTemplateChanged}">
      <option></option>
      {#each templates as {id, name, type}}
        <option 
          selected={element.template && element.template.id === id} 
          value="{id}" >
            {name} ({type})
        </option>
      {/each}
    </select>
  </Section>

  {#if element.template}

    <Section id="template" title="{element.template.name}">
      <!-- <label>Type</label>
      <input disabled value="{element.template.type}"/>

      <label>Name</label>
      <input disabled value="{element.template.name}"/> -->

      <label>Description</label>
      <textarea disabled value="{element.template.description}"></textarea>

      <label>Topic</label>
      <input disabled value="{element.template.topic}"/>

      <VariableList
        id="input-select"
        title="Input Variables"
        onSelectionChanged={handleVariableSelect}
        variables={element.template.inputs} />

      <VariableList
        id="output-select"
        title="Output Variables"
        onSelectionChanged={handleVariableSelect}
        variables={element.template.outputs} />

    </Section>

    {#if element.currentVariable}
      <VariableDetails 
        variable={element.currentVariable}
        onUpdateVariable={handleVariableChanged} />
    {/if}

  {:else}

    <Section id="details" title="Details">
      <label>Implementation</label>
      <select>
        <option></option>
      </select>
    </Section>

    <Section id="async" title="Asynchronous Continuations">
      <input type="checkbox"/>
      <label>Asynchronous Before</label>
      <br/>
      <input type="checkbox"/>
      <label>Asynchronous After</label>
    </Section>

    <Section id="documentation" title="Documentation">
      <label>Element Documentation</label>
      <input value=""/>
    </Section>

  {/if}
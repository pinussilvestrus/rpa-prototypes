<script>
    import { assign, debounce, find, forEach, map } from 'min-dash';

    import dom from 'domtastic';

    import Section from './Section';

    import TemplateSelect from './element-template/TemplateSelect';

    import VariableList from './element-template/VariableList';

    import {
      isProcess,
      isTask,
      isStartEvent
    } from '../../util/isElementType';

    const noop = () => {};

    $: {
      if (!element.implementation) {
        dom('#implementation-select').val(null);
      }
    }

    // populate, monkey-patching :(
    $: {
      if (element) {
        element.template = null;

        const template = getTemplate(element);
    
        if (template) {

          // (1) copy old inputs and outputs
          const inputsCopy = assign({}, element.inputs),
                outputsCopy = assign({}, element.outputs);

          // (2) map template inputs and outputs
          element.template = template;
          element.inputs = map(template.inputs, (input) => {
            return input;
          });

          // todo(pinussilvestrus): filter none mappings here?
          element.outputs = map(template.outputs, (output) => {
            return {
              ...output,
              name: (output.mappingType === 'process-variable' && output.processVariable)
                ? output.processVariable
                : output.name
            };
          });

          // (3) add previously available inputs and outputs
          forEach(inputsCopy, input => {
            if (!find(element.inputs, (i) => i.id === input.id)) {
              element.inputs.push(input);
            }
          });

          forEach(outputsCopy, output => {
            if (!find(element.outputs, (o) => o.id === output.id)) {
              element.outputs.push(output);
            }
          });
        }
      }
    }


    // exports //////////

    export let handlePropertyChanged = noop;
    export let handleTemplateChanged = noop;
    export let element;
    export let templates;
    export let hidden = false;


    // helpers //////////

    const getTemplate = (element) => {
      return element && find(templates, t => t.id === element.templateId);
    };

</script>

<div class="general-tab" class:hidden={hidden}>
  <Section id="general" title="General">
    <label>Id</label>
    <input name="id" on:change="{handlePropertyChanged}" value="{element.id}" />

    <label>Name</label>
    <input name="name" on:input="{debounce(handlePropertyChanged, 500)}" value="{element.name}" />

    {#if isProcess(element)}
      <label>Version Tag</label>
      <input name="versionTag" bind:value={element.versionTag}>

      <input type="checkbox" name="executable" bind:value={element.executable}/>
      <label>Executable</label>
      <br/>

    {:else if isTask(element)}
      <TemplateSelect
        {element}
        {templates}
        {handleTemplateChanged} /> 

        {#if element.templateId === 'External'}
          <label>Topic</label>
          <input autocomplete="off" bind:value={element.topic}/>
        {:else if element.templateId === 'Java Class'}
          <label>Java Class</label>
          <input bind:value={element.javaClass}/>
        {:else if element.templateId === 'Expression'}
          <label>Expression</label>
          <input bind:value={element.expression}/>

          <label>Result Variable</label>
          <input bind:value={element.resultVariable}/>
        {:else if element.templateId === 'Delegate Expression'}
          <label>Delegate Expression</label>
          <input bind:value={element.delegateExpression}/>
        {:else if element.templateId === 'Connector'}
          <p>Must configure Connector!</p>
        {/if}
      {/if}
  </Section>

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

  {:else}        

    {#if !isProcess(element)}
      <Section id="async" title="Asynchronous Continuations">
        <input type="checkbox"/>
        <label>Asynchronous Before</label>
        <br/>
        <input type="checkbox"/>
        <label>Asynchronous After</label>
      </Section>
    {/if}

    <Section id="documentation" title="Documentation">
      <label>Element Documentation</label>
      <input value=""/>
    </Section>

  {/if}
</div>

<script>
    import { debounce } from 'min-dash';

    import dom from 'domtastic';

    import Section from './Section';

    import TemplateSelect from './element-template/TemplateSelect';

    import VariableList from './element-template/VariableList';

    const noop = () => {};

    $: {
      if (!element.implementation) {
        dom('#implementation-select').val(null);
      }
    }


    // exports //////////

    export let handlePropertyChanged = noop;
    export let handleTemplateChanged = noop;
    export let element;
    export let templates;
    export let hidden = false;

    // helpers //////////

    const isProcess = (element) => {
      return element.type === 'bpmn:Process';
    };

    const isTask = (element) => {
      return element.type == 'bpmn:ServiceTask' || element.type == 'bpmn:ReceiveTask';
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

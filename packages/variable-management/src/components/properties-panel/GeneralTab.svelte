<script>
    import { debounce, find } from 'min-dash';

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

    // populate, monkey-patching :(
    $: {
      if (element) {
        element.template = null;

        const template = getTemplate(element);
    
        if (template) {

          element.template = template;
          element.inputs = template.inputs;
          element.outputs = template.outputs;
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

    const hasTemplates = () => {
      return !!templates.length;
    };

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

    {#if hasTemplates()}
      <TemplateSelect
        {element}
        {templates}
        {handleTemplateChanged} /> 
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
        ignoredSuggestions={element.template.outputs}
        bind:variables={element.template.inputs} />

      <VariableList
        id="output-select"
        title="Output Variables"
        bind:variables={element.template.outputs} />

    </Section>

  {:else}


    {#if !hasTemplates()}
      <Section id="details" title="Details">
        <label>Implementation</label>
        <!-- svelte-ignore a11y-no-onchange -->
        <select id="implementation-select" bind:value={element.implementation}>
          <option selected></option>
          <option>Java Class</option>
          <option>Expression</option>
          <option>Delegate Expression</option>
          <option>External</option>
          <option>Connector</option>
        </select>

        {#if element.implementation === 'External'}
          <label>Topic</label>
          <input autocomplete="off" bind:value={element.topic}/>
        {:else if element.implementation === 'Java Class'}
          <label>Java Class</label>
          <input value=""/>
        {:else if element.implementation === 'Expression'}
          <label>Expression</label>
          <input value=""/>

          <label>Result Variable</label>
          <input value=""/>
        {:else if element.implementation === 'Delegate Expression'}
          <label>Delegate Expression</label>
          <input value=""/>
        {:else if element.implementation === 'Connector'}
          <p>Must configure Connector!</p>
        {/if}
      </Section>
    {/if}

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
</div>

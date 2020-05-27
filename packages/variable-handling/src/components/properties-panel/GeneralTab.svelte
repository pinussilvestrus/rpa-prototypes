<script>
    import { debounce, findIndex, find } from 'min-dash';

    import dom from 'domtastic';

    import Section from './Section';

    const noop = () => {};

    // reset visual selections
    $: {
      const _resetSelection = (type) => {
        const otherSelect = dom(`#${type}-select`);
        otherSelect.val(null);
      };

      if (!(element && element.currentVariable)) {
        _resetSelection('input');
        _resetSelection('output');
      } else {
        isInputVariable(element.currentVariable)
          ? _resetSelection('output')
          : _resetSelection('input');
      }
    }


    // methods //////////

    const handleVariableSelect = (event) => {
      const variableNode = dom(event.target);

      if (!element.template) {
        return;
      }

      const value = variableNode.val();

      // find and set populated variable
      element.currentVariable = find(
        [
          ...element.template.inputs,
          ...element.template.outputs
        ], (variable) => variable.name === value);
    
      // reset variable complex mode, monkey patching :(
      element.currentVariable.complexModeEnabled = false;
    };

    const handleVariableChanged = (variableId, attrs) => {
      let currentVariable = element.currentVariable;

      if (!currentVariable) {
        return;
      }

      // (1) update current displayed variable
      currentVariable = {
        ...currentVariable,
        ...attrs
      };

      // (2) update in templates
      // NOTE: this is just for prototype purpose, normally we have to update the value
      // on the element itself, not in the template
      const template = find(templates, (t) => t.id === element.templateId);

      if (isInputVariable(currentVariable)) {
        const idx = findIndex(template.inputs, (i) => i.id === currentVariable.id);

        template.inputs[idx] = {
          ...template.inputs[idx],
          ...attrs
        };
      } else {
        const idx = findIndex(template.outputs, (o) => o.id === currentVariable.id);

        template.outputs[idx] = {
          ...template.outputs[idx],
          ...attrs
        };
      }

    };


    // exports //////////

    export let handlePropertyChanged = noop;
    export let handleTemplateChanged = noop;
    export let element;
    export let templates;
    export let variableListComponent;
    export let variableDetailsComponent;


    // helpers //////////


    const isInputVariable = (variable) => {
      return variable.type === 'input';
    };
</script>


<Section id="general" title="General">
    <label>Id</label>
    <input name="id" on:change="{handlePropertyChanged}" value="{element.id}" />

    <label>Name</label>
    <input name="name" on:input="{debounce(handlePropertyChanged, 500)}" value="{element.name}" />

    <label>Element Template</label>
    <!-- svelte-ignore a11y-no-onchange -->
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

      <label>Description</label>
      <textarea disabled value="{element.template.description}"></textarea>

      <label>Topic</label>
      <input disabled value="{element.template.topic}"/>

      <svelte:component
        this="{variableListComponent}"
        id="input-select"
        title="Input Variables"
        onSelectionChanged={handleVariableSelect}
        variables={element.template.inputs} />

      <svelte:component
        this="{variableListComponent}"
        id="output-select"
        title="Output Variables"
        onSelectionChanged={handleVariableSelect}
        variables={element.template.outputs} />

    </Section>

    {#if element.currentVariable}
      <svelte:component
        this="{variableDetailsComponent}"
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
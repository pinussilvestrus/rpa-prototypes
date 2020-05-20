<script>
    import { afterUpdate } from 'svelte';

    import { debounce, find } from 'min-dash';

    import dom from 'domtastic';

    import getElement from '../../util/getElement';

    import Section from './Section';

    import './PropertiesPanel.scss';

    const noop = () => {};

    let isHidden = true;
    $: isHidden = !element;

    let showOtherTabs = false;

    // populate
    $: {
      if (element) {
        element.template = null;
        if (element.templateId) {
          element.template = getTemplate(element);
        }
      }
    }

    // reset visual selections
    $: {
      const _resetSelection = (type) => {
        const otherSelect = dom(`#${type}-select`);
        otherSelect.val(null);
      };

      if (!(element && element.currentParameter)) {
        _resetSelection('input');
        _resetSelection('output');
      } else {
        element.currentParameter.type === 'input'
          ? _resetSelection('output')
          : _resetSelection('input');
      }
    }

    // lifecycle //////////

    afterUpdate(async () => {
      element && getElement(element.id).addClass('selected');
    });


    // methods //////////

    const handlePropertyChanged = (event) => {
      const inputNode = dom(event.target);

      onPropertiesChanged(element.id, {
        [inputNode.attr('name')]: inputNode.val()
      });
    };

    const handleTemplateChanged = (event) => {
      const selectNode = dom(event.target);

      onPropertiesChanged(element.id, {
        templateId: selectNode.val()
      });

      // reset to default state
      element.currentParameter = null;
      showOtherTabs = false;
    };

    const handleParameterSelect = (event) => {
      const parameterNode = dom(event.target);

      if (!element.template) {
        return;
      }

      const value = parameterNode.val();

      // find and set populated parameter
      element.currentParameter = find(
        [
          ...element.template.inputs,
          ...element.template.outputs
        ], (parameter) => parameter.name === value);
    };

    const handleShowOtherTabs = () => {
      showOtherTabs = true;
    };


    // exports //////////

    export let element = null;
    export let onPropertiesChanged = noop;
    export let templates = [];
    export let tabsReplaceComponent;

    
    // helpers //////////

    const getTemplate = (element) => {
      return element && find(templates, t => t.id === element.templateId);
    };

    // todo(pinussilvestrus): move sections to own class

</script>

<div class="properties-panel" class:hidden="{isHidden}">
  <div class="container">
    {#if element}
      <div class="header">
        <div class="title">{element.id}</div>

        <ul class="tabs">
          <li class="tab tab-active"><p>General</p></li>
          {#if showOtherTabs || !element.template}
            <li class="tab"><p>Listeners</p></li>
            <li class="tab"><p>Input/Output</p></li>
            <li class="tab"><p>Field Injections</p></li>
            <li class="tab"><p>Extensions</p></li>
          {:else}
            <svelte:component 
              this="{tabsReplaceComponent}"
              onAction={handleShowOtherTabs} />
          {/if}
        </ul>
      </div>

      <div class="properties">

        <Section id="general" title="General">
          <label>Id</label>
          <input name="id" on:input="{debounce(handlePropertyChanged, 500)}" value="{element.id}" />
  
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

          <Section id="template" title="Implementation">
            <!-- <label>Type</label>
            <input disabled value="{element.template.type}"/>

            <label>Name</label>
            <input disabled value="{element.template.name}"/> -->

            <label>Topic</label>
            <input disabled value="{element.template.topic}"/>

            <label>Input Parameters</label>
            <select 
              id="input-select" 
              size="{element.template.inputs.length}" 
              on:change={handleParameterSelect} >
                {#each element.template.inputs as {name}}
                  <option>{name}</option>
                {/each}
            </select>

            <label>Output Parameters</label>
            <select 
              id="output-select"
              size="{element.template.outputs.length}" 
              on:change={handleParameterSelect} >
                {#each element.template.outputs as {name}}
                  <option>{name}</option>
                {/each}
            </select>
          </Section>

          {#if element.currentParameter}

            <Section id="parameter-details" title="{element.currentParameter.type === 'input' ? 'Input' : 'Output' } Parameter" >
              <label>Name</label>
              <input name="name" disabled value="{element.currentParameter.name}" />

              <label>Description</label>
              <input name="description" disabled value="{element.currentParameter.description}" />

              <label>Assignment</label>
              <input />
            </Section>

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
      </div>

    {/if}
  </div>
</div>
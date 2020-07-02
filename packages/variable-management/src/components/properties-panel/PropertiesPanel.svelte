<script>
    import dom from 'domtastic';

    import { assign, forEach, find, map } from 'min-dash';

    import GeneralTab from './GeneralTab';
    import InputOutputTab from './input-output/InputOutputTab';
    import Variables from './VariablesTab';
    import ProcessInputTab from './process-input/ProcessInputTab';

    import ToggleAllTabs from './ToggleAllTabs';

    import './PropertiesPanel.scss';

    const noop = () => {};

    let showOtherTabs = false;
    let activeTab = 'general';


    // lifecycle //////////

    // fix impossible active tabs / element combinations
    // todo(pinussilvestrus): that's dirty. prevent in the first place?
    $: {
      if (activeTab === 'variables' && !isProcess(element)) {
        activeTab = 'general';
      }

      if (activeTab === 'input-output' && !isTask(element)) {
        activeTab = 'general';
      }

      if (activeTab === 'output' && !isStartEvent(element)) {
        activeTab = 'general';
      }

      if (activeTab === 'process-start' && !isStartEvent(element)) {
        activeTab = 'general';
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

      // notify others that template has changed
      const context = onTemplateChanged({ activeTab });
      if (context) {
        activeTab = context.activeTab;
      }

      // reset to default state
      showOtherTabs = false;
    };

    const handleShowOtherTabs = () => {
      showOtherTabs = true;
    };

    const handleTabClick = (event) => {
      const tabNode = dom(event.target).closest('.tab'),
            newTab = tabNode.attr('data-tab');
    
      activeTab = newTab;
    };


    // exports //////////

    export let element = null;
    export let onPropertiesChanged = noop;
    export let templates = [];
    export let templateTabsComponent;
    export let templateTabComponent;
    export let templateInGeneralComponent;
    export let onTemplateChanged = noop;


    // helpers //////////

    const isProcess = (element) => {
      return element.type === 'bpmn:Process';
    };

    const isTask = (element) => {
      return element.type === 'bpmn:ServiceTask' || element.type === 'bpmn:ReceiveTask';
    };

    const isStartEvent = (element) => {
      return element.type === 'bpmn:StartEvent';
    };

    const getTemplate = (element) => {
      return element && find(templates, t => t.id === element.templateId);
    };

</script>

<div class="properties-panel">
  {#if element}
    <div class="container">
        <div class="header">
          <div class="title">{element.id}</div>

          <ul class="tabs">
            <li 
              class="tab" 
              data-tab="general" 
              class:tab-hidden="{!showOtherTabs && activeTab === 'template'}"
              class:tab-active="{activeTab === 'general'}"
              on:click={handleTabClick}><p>General</p></li>
            <svelte:component
              this="{templateTabsComponent}" 
              element={element}
              {activeTab}
              onTabClick={handleTabClick}
            />
            {#if showOtherTabs || !element.template}
              <li class="tab"><p>Listeners</p></li>
              {#if isProcess(element)}
                <li 
                  class="tab" 
                  class:tab-active="{activeTab === 'variables'}"
                  data-tab="variables" 
                  on:click={handleTabClick}><p>Variables</p></li>
              {:else if isStartEvent(element)}
                <li 
                  class="tab" 
                  class:tab-active="{activeTab === 'process-start'}"
                  data-tab="process-start" 
                  on:click={handleTabClick}><p>Process Inputs</p></li>
              {:else}
                <li
                  class="tab"
                  class:tab-active="{activeTab === 'input-output'}"
                  data-tab="input-output"
                  on:click="{handleTabClick}">
                  <p>Input/Output</p>
                </li>
                <li class="tab"><p>Field Injections</p></li>
              
              {/if}
              <li class="tab"><p>Extensions</p></li>
            {:else}
              <ToggleAllTabs onAction={handleShowOtherTabs} />
            {/if}
          </ul>
        </div>

        <div class="properties">

          <GeneralTab
            {handlePropertyChanged}
            {handleTemplateChanged}
            {templateInGeneralComponent}
            bind:element={element}
            hidden="{activeTab !== 'general'}"
            {templates} />

          <svelte:component 
            this="{templateTabComponent}"
            bind:element={element}
            hidden="{activeTab !== 'template'}"
          />
          
          <InputOutputTab 
            bind:element={element}
            hidden="{activeTab !== 'input-output'}"
          />

          <ProcessInputTab
            bind:element={element}
            hidden="{activeTab !== 'process-start'}" />

          <Variables 
            bind:element={element}
            hidden="{activeTab !== 'variables'}"
          />
        </div>
    </div>
  {/if}
  <div class="open-properties-panel">Properties Panel</div>
</div>
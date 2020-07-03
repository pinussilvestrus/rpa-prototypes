<script>
    import dom from 'domtastic';

    import GeneralTab from './GeneralTab';
    import InputOutputTab from './input-output/InputOutputTab';
    import Variables from './VariablesTab';
    import ProcessInputTab from './process-input/ProcessInputTab';

    import ToggleAllTabs from './ToggleAllTabs';

    import {
      isProcess,
      isTask,
      isStartEvent
    } from '../../util/isElementType';

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

</script>

<div class="properties-panel">
  {#if element}
    <div class="container">
        <div class="header">
          <div class="title">{element.name}</div>

          <ul class="tabs">
            <li 
              class="tab" 
              data-tab="general" 
              class:tab-active="{activeTab === 'general'}"
              on:click={handleTabClick}><p>General</p></li>
            {#if showOtherTabs || !element.template}
              {#if isProcess(element)}
                <li 
                  class="tab" 
                  class:tab-active="{activeTab === 'variables'}"
                  data-tab="variables" 
                  on:click={handleTabClick}><p>Variables</p></li>
              {/if}

              {#if isStartEvent(element)}
                <li 
                  class="tab" 
                  class:tab-active="{activeTab === 'process-start'}"
                  data-tab="process-start" 
                  on:click={handleTabClick}><p>Process Inputs</p></li>
              {/if}

              <li class="tab"><p>Listeners</p></li>

              {#if isTask(element)}
                <li
                  class="tab"
                  class:tab-active="{activeTab === 'input-output'}"
                  data-tab="input-output"
                  on:click="{handleTabClick}"><p>Input/Output</p></li>
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
            bind:element={element}
            hidden="{activeTab !== 'general'}"
            {templates} />
          
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
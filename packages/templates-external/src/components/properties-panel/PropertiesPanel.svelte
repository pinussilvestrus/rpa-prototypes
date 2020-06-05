<script>
    import { find } from 'min-dash';

    import dom from 'domtastic';

    import GeneralTab from './GeneralTab';
    import InputOutputTab from './input-output/InputOutputTab';

    import ToggleAllTabs from './ToggleAllTabs';

    import './PropertiesPanel.scss';

    const noop = () => {};

    let showOtherTabs = false;
    let activeTab = 'general';

    // populate, monkey-patching :(
    $: {
      if (element) {
        element.template = null;
    
        if (element.templateId) {
          element.template = getTemplate(element);
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

      // reset to default state
      element.currentVariable = null;
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
    export let variableListComponent;
    export let variableDetailsComponent;
    export let templates = [];
    
    // helpers //////////

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
            class:tab-active="{activeTab === 'general'}"
            on:click={handleTabClick}><p>General</p></li>
          {#if showOtherTabs || !element.template}
            <li class="tab"><p>Listeners</p></li>
            <li 
              class="tab" 
              class:tab-active="{activeTab === 'input-output'}"
              data-tab="input-output" 
              on:click={handleTabClick}><p>Input/Output</p></li>
            <li class="tab"><p>Field Injections</p></li>
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
          {element}
          hidden="{activeTab !== 'general'}"
          {templates}
          {variableListComponent}
          {variableDetailsComponent} />
        
        <InputOutputTab 
          {element}
          hidden="{activeTab !== 'input-output'}"
        />
      </div>
  </div>
  {/if}
  <div class="open-properties-panel">Properties Panel</div>
</div>
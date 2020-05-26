<script>
    import { find, findIndex } from 'min-dash';

    import dom from 'domtastic';

    import GeneralTab from './GeneralTab';

    import ToggleAllTabs from './ToggleAllTabs';

    import './PropertiesPanel.scss';

    const noop = () => {};

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

    const handlePropertyChanged = (event) => {
      const inputNode = dom(event.target);

      onPropertiesChanged(element.id, {
        [inputNode.attr('name')]: inputNode.val()
      });
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

    const handleTemplateChanged = (event) => {
      const selectNode = dom(event.target);

      onPropertiesChanged(element.id, {
        templateId: selectNode.val()
      });

      // reset to default state
      element.currentVariable = null;
      showOtherTabs = false;
    };

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

    const handleShowOtherTabs = () => {
      showOtherTabs = true;
    };


    // exports //////////

    export let element = null;
    export let onPropertiesChanged = noop;
    export let variableListComponent;
    export let templates = [];
    
    // helpers //////////

    const getTemplate = (element) => {
      return element && find(templates, t => t.id === element.templateId);
    };

    const isInputVariable = (variable) => {
      return variable.type === 'input';
    };

</script>

<div class="properties-panel">
  {#if element}
  <div class="container">
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
            <ToggleAllTabs onAction={handleShowOtherTabs} />
          {/if}
        </ul>
      </div>

      <div class="properties">

        <GeneralTab
          {handlePropertyChanged}
          {handleTemplateChanged}
          {element}
          {templates}
          {handleVariableSelect}
          {handleVariableChanged}
          {variableListComponent} />
      </div>
  </div>
  {/if}
  <div class="open-properties-panel">Properties Panel</div>
</div>
<script>
    import { afterUpdate } from 'svelte';

    import { find } from 'min-dash';

    import dom from 'domtastic';

    import getElement from '../util/getElement';

    import './PropertiesPanel.scss';


    const TEMPLATES = [
      {
        id: 'get-price-tag',
        type: 'UI Path Bot',
        name: 'Get Price Tag',
        topic: 'get-price-tag'
      },
      {
        id: 'calculate-price',
        type: 'UI Path Bot',
        name: 'Calculate Price',
        topic: 'calculate-price'
      },
      {
        id: 'print-invoice',
        type: 'UI Path Bot',
        name: 'Print Invoice',
        topic: 'print-invoice'
      }
    ];

    const noop = () => {};

    let isHidden = true;
    $: isHidden = !element;

    // populate
    $: {
      if (element) {
        element.template = null;
        if (element.templateId) {
          element.template = getTemplate(element);
        }
      }
    }

    // lifecycle //////////

    afterUpdate(async () => {
      element && getElement(element.id).addClass('selected');
    });


    // methods //////////

    const handleTemplateChanged = (event) => {
      const selectNode = dom(event.target);

      onPropertiesChanged(element.id, {
        templateId: selectNode.val()
      });
    };


    // exports //////////

    export let element = null;
    export let onPropertiesChanged = noop;

    
    // helpers //////////

    const getTemplate = (element) => {
      return element && find(TEMPLATES, t => t.id === element.templateId);
    };

</script>

<div class="properties-panel" class:hidden="{isHidden}">
  <div class="container">
    {#if element}
      <div class="header">
        <div class="title">{element.name}</div>
      </div>

      <div class="section">
        <h1>General</h1>

        <label>Id</label>
        <input value="{element.id}"/>

        <label>Name</label>
        <input value="{element.name}"/>

        <label>Element Template</label>
        <select id="element-template" on:change="{handleTemplateChanged}">
          <option></option>
          {#each TEMPLATES as {id, name}}
            <option 
              selected={element.template && element.template.id === id} 
              value="{id}" >
                {name}
            </option>
          {/each}
        </select>
      </div>

      {#if element.template}
        <div class="section">
            <h1>Worker details</h1>

            <label>Type</label>
            <input disabled value="{element.template.type}"/>

            <label>Name</label>
            <input disabled value="{element.template.name}"/>

            <label>Topic</label>
            <input disabled value="{element.template.topic}"/>

            <label>Input Parameters</label>
            <textarea rows="5"></textarea>

            <label>Output Parameters</label>
            <textarea rows="5"></textarea>
        </div>
      {/if}
    {/if}
  </div>
</div>
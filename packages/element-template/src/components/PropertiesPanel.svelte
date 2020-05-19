<script>
    import { afterUpdate } from 'svelte';

    import { debounce, find } from 'min-dash';

    import dom from 'domtastic';

    import getElement from '../util/getElement';

    import './PropertiesPanel.scss';


    const TEMPLATES = [
      {
        id: 'get-price-tag',
        type: 'UI Path Bot',
        name: 'Get Price Tag',
        topic: 'get-price-tag',
        inputs: [
          'status', 'input2'
        ],
        outputs: [
          'price-tag', 'output2'
        ]
      },
      {
        id: 'calculate-price',
        type: 'UI Path Bot',
        name: 'Calculate Price',
        topic: 'calculate-price',
        inputs: [
          'input1', 'input2'
        ],
        outputs: [
          'output1', 'output2'
        ]
      },
      {
        id: 'print-invoice',
        type: 'UI Path Bot',
        name: 'Print Invoice',
        topic: 'print-invoice',
        inputs: [
          'input1', 'input2'
        ],
        outputs: [
          'output1', 'output2'
        ]
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
    };

    const handleSectionTitleClick = (event) => {
      const titleNode = dom(event.target),
            id = titleNode.attr('id'),
            section = dom(`.section[data-title-ref="#${id}"]`);

      if (section.hasClass('hidden')) {
        titleNode.removeClass('inactive');
        section.removeClass('hidden');
      } else {
        titleNode.addClass('inactive');
        section.addClass('hidden');
      }
    };


    // exports //////////

    export let element = null;
    export let onPropertiesChanged = noop;

    
    // helpers //////////

    const getTemplate = (element) => {
      return element && find(TEMPLATES, t => t.id === element.templateId);
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
          {#if !element.template}
            <li class="tab"><p>Listeners</p></li>
            <li class="tab"><p>Input/Output</p></li>
            <li class="tab"><p>Field Injections</p></li>
            <li class="tab"><p>Extensions</p></li>
          {/if}
        </ul>
      </div>

      <div class="properties">
        <div 
          class="section-title" 
          id="general" 
          on:click={handleSectionTitleClick} >General <i></i></div>
        <div class="section" data-title-ref="#general">
  
          <label>Id</label>
          <input name="id" disabled value="{element.id}" />
  
          <label>Name</label>
          <input name="name" on:input="{debounce(handlePropertyChanged, 500)}" value="{element.name}" />
  
          <label>Implementation Template</label>
          <select id="element-template" on:change="{handleTemplateChanged}">
            <option></option>
            {#each TEMPLATES as {id, name, type}}
              <option 
                selected={element.template && element.template.id === id} 
                value="{id}" >
                  {name} ({type})
              </option>
            {/each}
          </select>
        </div>
  
        {#if element.template}
          <div 
            class="section-title" 
            id="template"
            on:click={handleSectionTitleClick} >Implementation Details <i></i></div>
          <div class="section" data-title-ref="#template">
  
              <!-- <label>Type</label>
              <input disabled value="{element.template.type}"/>
  
              <label>Name</label>
              <input disabled value="{element.template.name}"/> -->
  
              <label>Topic</label>
              <input disabled value="{element.template.topic}"/>
  
              <label>Input Parameters</label>
              <select disabled size="{element.template.inputs.length}">
                {#each element.template.inputs as input}
                  <option>{input}</option>
                {/each}
              </select>
  
              <label>Output Parameters</label>
              <select disabled size="{element.template.outputs.length}">
                {#each element.template.outputs as output}
                  <option>{output}</option>
                {/each}
              </select>
          </div>
        {:else}
        <div 
        class="section-title" 
        id="details"
        on:click={handleSectionTitleClick} >Details <i></i></div>
        <div class="section" data-title-ref="#details">

          <label>Implementation</label>
          <select>
            <option></option>
          </select>
        </div>
        <div 
          class="section-title" 
          id="async"
          on:click={handleSectionTitleClick} >Asynchronous Continuations <i></i></div>
        <div class="section" data-title-ref="#async">

            <input type="checkbox"/>
            <label>Asynchronous Before</label>
            <br/>
            <input type="checkbox"/>
            <label>Asynchronous After</label>
        </div>
        <div 
          class="section-title" 
          id="documentation"
          on:click={handleSectionTitleClick} >Documentation <i></i></div>
        <div class="section" data-title-ref="#documentation">

          <label>Element Documentation</label>
          <input value=""/>
        </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
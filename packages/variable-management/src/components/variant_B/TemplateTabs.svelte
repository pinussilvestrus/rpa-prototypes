<script>
    const noop = () => {};

    export let activeTab;
    export let element;
    export let onTabClick = noop;


    // helpers //////////

    const hasTemplate = (element) => {
      return element && !!element.template;
    };
    
</script>

<li
  class="tab"
  class:tab-active="{activeTab === 'template'}"
  class:tab-hidden="{!hasTemplate(element)}"
  data-tab="template"
  on:click="{onTabClick}">
    <p>Task Template</p>
</li>

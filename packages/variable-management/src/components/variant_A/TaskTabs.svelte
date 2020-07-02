<script>
    const noop = () => {};

    export let activeTab;
    export let onTabClick = noop;
</script>

<li
  class="tab"
  class:tab-active="{activeTab === 'input-output'}"
  data-tab="input-output"
  on:click="{onTabClick}">
  <p>Input/Output</p>
</li>
<li class="tab"><p>Field Injections</p></li>

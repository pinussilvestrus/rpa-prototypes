<script>
    const noop = () => {};

    export let activeTab;
    export let onTabClick = noop;
</script>

<li class="tab"><p>Forms</p></li>
<li 
  class="tab" 
  class:tab-active="{activeTab === 'process-start'}"
  data-tab="process-start" 
  on:click={onTabClick}><p>Process Inputs</p></li>
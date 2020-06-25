<script>
    const noop = () => {};

    export let activeTab;
    export let onTabClick = noop;
</script>

<li 
  class="tab" 
  class:tab-active="{activeTab === 'process-start'}"
  data-tab="process-start" 
  on:click={onTabClick}><p>Forms</p></li>
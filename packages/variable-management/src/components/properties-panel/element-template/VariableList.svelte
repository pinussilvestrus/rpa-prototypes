<script>
  import './VariableList.scss';

  // exports //////////

  export let id;
  export let title;
  export let variables = [];
  export let elementId;
  export let variableListItemComponent;

</script>

<div class="variable-list" id={id}>
  <div class="variable-list-title">{title}</div>

  {#each variables as variable}
    <svelte:component 
      this="{variableListItemComponent}" 
      {elementId} 
      bind:variable={variable} />
  {:else}
    <p class="empty">None</p>
  {/each}
</div>
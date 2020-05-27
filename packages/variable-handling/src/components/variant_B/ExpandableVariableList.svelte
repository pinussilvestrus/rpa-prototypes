<script>
  import './ExpandableVariableList.scss';

  export let id;
  export let title;
  export let variables = [];
</script>

<div class="expandable-list" id={id}>
  <div class="expandable-list-title">{title}</div>

  {#each variables as variable}
    <div class="variable" id={variable.id}>
      <p class="variable-name">{variable.name}</p>
      <p class="variable-description">{variable.description}</p>
    </div>
  {:else}
    <p class="empty">None</p>
  {/each}
</div>
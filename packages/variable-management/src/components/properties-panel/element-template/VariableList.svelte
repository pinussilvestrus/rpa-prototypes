<script>
  import './VariableList.scss';

  import VariableListItem from './VariableListItem';

  // exports //////////

  export let id;
  export let title;
  export let variables = [];
  export let elementId;

</script>

<div class="variable-list" id={id}>
  <div class="variable-list-title">{title}</div>

  {#each variables as variable}
    <VariableListItem {elementId} bind:variable={variable} />
  {:else}
    <p class="empty">None</p>
  {/each}
</div>
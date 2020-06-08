<script>
  import './ExpandableVariableList.scss';

  import ExpandableListItem from './ExpandableListItem';

  // exports //////////

  export let id;
  export let title;
  export let variables = [];

</script>

<div class="expandable-list" id={id}>
  <div class="expandable-list-title">{title}</div>

  {#each variables as variable}
    <ExpandableListItem {variable} />
  {:else}
    <p class="empty">None</p>
  {/each}
</div>
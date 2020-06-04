<script>
  import './ExpandableVariableList.scss';

  import ExpandableListItem from './ExpandableListItem';

  const noop = () => {};


  // exports //////////

  export let id;
  export let title;
  export let variables = [];
  export let onUpdateVariable = noop;

</script>

<div class="expandable-list" id={id}>
  <div class="expandable-list-title">{title}</div>

  {#each variables as variable}
    <ExpandableListItem {variable} {onUpdateVariable} />
  {:else}
    <p class="empty">None</p>
  {/each}
</div>
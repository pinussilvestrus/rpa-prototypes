<script>
    import './ToggleAllTabs.scss';

    const noop = () => {};

    export let onAction = noop;
</script>

<div class="toggle-all-tabs" on:click={onAction}>
  Show all tabs
</div>
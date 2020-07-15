<script>
    import './Switch.scss';

    const noop = () => {};


    // notify parent component when check has checked
    $: {
      onCheck(checked);
    }

    // exports //////////

    export let checked = false;
    export let offLabel = 'off';
    export let onLabel = 'on';
    export let onCheck = noop;

</script>

<div class="switch">
    <label class="switcher">
        <input type="checkbox" bind:checked />
        <span class="slider" />
    </label>
      
    <p class="label">{checked ? onLabel : offLabel}</p>
</div>

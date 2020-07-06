<script>
    import './Switch.scss';
    

    // exports //////////

    export let checked = false;
    export let offLabel = 'off';
    export let onLabel = 'on';
</script>

<div class="switch">
    <label class="switcher">
        <input type="checkbox" bind:checked />
        <span class="slider" />
    </label>
      
    <p class="label">{checked ? onLabel : offLabel}</p>
</div>

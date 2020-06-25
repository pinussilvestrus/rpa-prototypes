<script>
    import InputOutputTab from '../properties-panel/input-output/InputOutputTab';

    export let element;
    export let activeTab;
</script>

<InputOutputTab 
    bind:element={element}
    onlyOutputs="true"
    hidden="{activeTab !== 'process-start'}" />
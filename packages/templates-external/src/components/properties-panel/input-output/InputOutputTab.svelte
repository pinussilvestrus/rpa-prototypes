<script>
    import Section from '../Section';

    import AddInput from './AddInput';
    import AddOutput from './AddOutput';
    import AddOutputMapping from './AddOutputMapping';

    import './InputOutputTab.scss';

    export let element;
    export let hidden = true;
</script>

<div class="input-output-tab" class:hidden={hidden}>
    <Section 
        id="data-inputs" 
        title="Data Input Specification" 
        addComponent={AddInput}>
            foo
    </Section>

    <Section 
        id="data-outputs" 
        title="Data Output Specification"
        addComponent={AddOutput}>
            foo
    </Section>

    <Section 
        id="output-mappings" 
        title="Output Mapping"
        addComponent={AddOutputMapping}>
        foo
    </Section>
</div>
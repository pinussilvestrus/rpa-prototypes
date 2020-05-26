<script>
    import BasicEditor from '../BasicEditor';

    import VariableList from './VariableList';

    export let elements;
    export let templates;
</script>

<BasicEditor {elements} {templates} variableListComponent={VariableList} />
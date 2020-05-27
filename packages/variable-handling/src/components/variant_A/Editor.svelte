<script>
    import BasicEditor from '../BasicEditor';

    import VariableList from './VariableList';
    import VariableDetails from './VariableDetails';

    export let elements;
    export let templates;
</script>

<BasicEditor 
    {elements} 
    {templates} 
    variableListComponent={VariableList}
    variableDetailsComponent={VariableDetails} />
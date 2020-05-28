<script>
    import BasicEditor from '../BasicEditor';

    import ExpandableVariableList from './ExpandableVariableList';

    export let elements;
    export let templates;

    // no variation
</script>

<BasicEditor 
  {elements} 
  {templates} 
  templateSelectLabel="Service Catalog"
  variableListComponent={ExpandableVariableList} />
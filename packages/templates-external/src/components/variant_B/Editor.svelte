<script>
    import BasicEditor from '../BasicEditor';

    import ExpandableVariableList from './ExpandableVariableList';

    import {
      ELEMENTS as elements,
      TEMPLATES as templates
    } from '../../../resources/data';

</script>

<BasicEditor 
  {elements} 
  {templates} 
  variableListComponent={ExpandableVariableList} />
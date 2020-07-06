<script>
    import BasicEditor from '../BasicEditor';

    import InputOutputTab from '../properties-panel/input-output/InputOutputTab';
    import VariableListItem from '../properties-panel/element-template/VariableListItem';

    import {
      ELEMENTS as elements
    } from '../../../resources/data';

</script>

<BasicEditor 
  {elements}
  variableListItemComponent={VariableListItem}
  inputOutputTabComponent={InputOutputTab} />
<script>
    import BasicEditor from '../BasicEditor';

    import InputOutputTab from '../properties-panel/input-output-2/InputOutputTab';

    import VariableListItem from '../properties-panel/element-template/VariableListItem2';


    import {
      ELEMENTS as elements,
      TEMPLATES as templates
    } from '../../../resources/data';

</script>

<BasicEditor 
  {elements} 
  {templates}
  variableListItemComponent={VariableListItem}
  inputOutputTabComponent={InputOutputTab} />
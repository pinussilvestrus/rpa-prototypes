<script>
    import BasicEditor from '../BasicEditor';

    import VariableList from '../properties-panel/element-template/VariableList';

    import TemplateSelect from './TemplateSelect';

    import {
      ELEMENTS as elements,
      TEMPLATES as templates
    } from '../../../resources/data';

</script>

<BasicEditor 
  {elements} 
  {templates} 
  variableListComponent={VariableList}
  selectTemplateComponent={TemplateSelect} />
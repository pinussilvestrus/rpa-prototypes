<script>
    import BasicEditor from '../BasicEditor';

    import ExpandableVariableList from '../properties-panel/element-template/ExpandableVariableList';
    import TemplateSelect from './TemplateSelect';

    import {
      ELEMENTS as elements,
      TEMPLATES as templates
    } from '../../../resources/data';

</script>

<BasicEditor 
  {elements} 
  {templates} 
  variableListComponent={ExpandableVariableList}
  selectTemplateComponent={TemplateSelect} />
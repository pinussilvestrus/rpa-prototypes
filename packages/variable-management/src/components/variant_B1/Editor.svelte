<script>
    import BasicEditor from '../BasicEditor';

    import InputOutputTab from '../properties-panel/input-output/InputOutputTab';

    import {
      ELEMENTS as elements,
      TEMPLATES as templates
    } from '../../../resources/data';

</script>

<BasicEditor 
  {elements} 
  {templates}
  inputOutputTabComponent={InputOutputTab} />
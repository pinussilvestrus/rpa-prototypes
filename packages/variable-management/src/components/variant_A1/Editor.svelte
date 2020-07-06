<script>
    import BasicEditor from '../BasicEditor';

    import InputOutputTab from '../properties-panel/input-output/InputOutputTab';

    import {
      ELEMENTS as elements
    } from '../../../resources/data';

</script>

<BasicEditor 
  {elements}
  inputOutputTabComponent={InputOutputTab} />
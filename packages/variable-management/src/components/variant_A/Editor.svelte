<script>
    import BasicEditor from '../BasicEditor';

    import TemplateInGeneral from './TemplateInGeneral';

    import {
      ELEMENTS as elements,
      TEMPLATES as templates
    } from '../../../resources/data';

</script>

<BasicEditor 
  {elements} 
  {templates}
  templateInGeneralComponent={TemplateInGeneral} />
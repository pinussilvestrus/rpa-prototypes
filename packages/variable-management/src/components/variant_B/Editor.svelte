<script>
    import BasicEditor from '../BasicEditor';

    import StartEventTabs from './StartEventTabs';
    import FormTab from './FormTab';

    import {
      ELEMENTS as elements,
      TEMPLATES as templates
    } from '../../../resources/data';

</script>

<BasicEditor 
  {elements} 
  {templates}
  processStartComponent={FormTab}
  startEventTabsComponent={StartEventTabs} />
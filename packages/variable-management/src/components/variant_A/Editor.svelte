<script>
    import BasicEditor from '../BasicEditor';

    import StartEventTabs from './StartEventTabs';
    import ProcessInputTab from './ProcessInputTab';

    import {
      ELEMENTS as elements,
      TEMPLATES as templates
    } from '../../../resources/data';

</script>

<BasicEditor 
  {elements} 
  {templates}
  processStartComponent={ProcessInputTab}
  startEventTabsComponent={StartEventTabs} />
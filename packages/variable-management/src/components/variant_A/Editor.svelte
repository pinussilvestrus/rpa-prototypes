<script>
    import BasicEditor from '../BasicEditor';

    import TaskTabs from './TaskTabs';

    import {
      ELEMENTS as elements,
      TEMPLATES as templates
    } from '../../../resources/data';

</script>

<BasicEditor 
  {elements} 
  {templates}
  taskTabsComponent={TaskTabs} />
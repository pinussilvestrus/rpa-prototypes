<script>
    import BasicEditor from '../BasicEditor';

    import TemplateTabs from './TemplateTabs';
    import TemplateTab from './TemplateTab';

    import {
      ELEMENTS as elements,
      TEMPLATES as templates
    } from '../../../resources/data';

    const handleTemplateChanged = ({ activeTab }) => {
      activeTab = 'template';
      return { activeTab };
    };

</script>

<BasicEditor 
  {elements} 
  {templates}
  templateTabsComponent={TemplateTabs}
  templateTabComponent={TemplateTab}
  onTemplateChanged={handleTemplateChanged} />
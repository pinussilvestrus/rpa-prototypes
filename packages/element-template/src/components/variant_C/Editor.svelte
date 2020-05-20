<script>
    import BasicEditor from '../BasicEditor';

    import ShowAllTabs from './ShowAllTabs';

    export let elements;
    export let templates;
</script>

<BasicEditor tabsReplaceComponent={ShowAllTabs} {elements} {templates} />
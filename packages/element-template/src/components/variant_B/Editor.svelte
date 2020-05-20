<script>
    import BasicEditor from '../BasicEditor';

    import ToggleAllTabs from './ToggleAllTabs';

    export let elements;
    export let templates;
</script>

<BasicEditor tabsReplaceComponent={ToggleAllTabs} {elements} {templates} />
<script>
    import generateId from '../../../util/generateId';

    const noop = () => {};

    // methods //////////

    const handleAddOutputMapping = () => {
      const id = `output-mapping-${generateId()}`;

      collection.push({
        id,
        name: id,
        description: 'foo'
      });

      onUpdateCollection('outputMappings', collection);
    };


    // exports //////////

    export let collection;
    export let onUpdateCollection = noop;
</script>

<div class="add add-output-mapping" on:click={handleAddOutputMapping}>
    Add Output Mapping
</div>
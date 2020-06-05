<script>
    import generateId from '../../../util/generateId';

    const noop = () => {};

    // methods //////////

    const handleAddInput = () => {
      const id = `input-${generateId()}`;

      collection.push({
        id,
        name: id,
        mappingType: 'process-variable',
        description: ''
      });

      onUpdateCollection('inputs', collection);
    };


    // exports //////////

    export let collection;
    export let onUpdateCollection = noop;
</script>

<div class="add add-input" on:click={handleAddInput}>
    Add Input Parameter
</div>
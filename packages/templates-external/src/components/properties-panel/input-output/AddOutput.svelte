<script>
    import generateId from '../../../util/generateId';

    const noop = () => {};

    // methods //////////

    const handleAddOutput = () => {
      const id = `output-${generateId()}`;

      collection.push({
        id,
        name: id,
        description: ''
      });

      onUpdateCollection('outputs', collection);
    };


    // exports //////////

    export let collection;
    export let onUpdateCollection = noop;
</script>

<div class="add add-output" on:click={handleAddOutput}>
    Add Output Parameter
</div>
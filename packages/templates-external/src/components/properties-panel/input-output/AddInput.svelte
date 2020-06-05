<script>
    import generateId from '../../../util/generateId';

    const noop = () => {};

    // methods //////////

    const handleAddInput = () => {
      const id = `input-${generateId()}`;

      collection.push({
        id,
        name: id,
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
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
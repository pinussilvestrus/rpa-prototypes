<script>
    import generateId from '../../../util/generateId';

    import PlusSvg from '../../svg/plus.svg';

    const noop = () => {};

    // methods //////////

    const handleAddInput = () => {
      const id = `input_${generateId()}`;

      collection.unshift({
        id,
        name: id,
        mappingType: 'process-variable',
        description: ''
      });

      onUpdateCollection('inputs', collection, {
        lastAddedItemIdx: id
      });
    };


    // exports //////////

    export let collection;
    export let onUpdateCollection = noop;
</script>

<div class="action add add-input" on:click={handleAddInput}>
  {@html PlusSvg}
</div>
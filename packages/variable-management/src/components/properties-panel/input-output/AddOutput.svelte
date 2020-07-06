<script>
    import generateId from '../../../util/generateId';

    import PlusSvg from '../../svg/plus.svg';

    const noop = () => {};

    // methods //////////

    const handleAddOutput = () => {
      const id = `output_${generateId()}`;

      collection.unshift({
        id,
        name: id,
        description: '',
        mappingType: 'none-mapping'
      });

      onUpdateCollection('outputs', collection, {
        lastAddedItemIdx: id
      });
    };


    // exports //////////

    export let collection;
    export let onUpdateCollection = noop;
</script>

<div class="action add add-output" on:click={handleAddOutput}>
  {@html PlusSvg}
</div>
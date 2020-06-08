<script>
    import generateId from '../../../util/generateId';

    import PlusSvg from '../../svg/plus.svg';

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

<div class="action add add-input" on:click={handleAddInput}>
  {@html PlusSvg}
</div>
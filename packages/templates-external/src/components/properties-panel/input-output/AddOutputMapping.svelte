<script>
    import generateId from '../../../util/generateId';
    
    import PlusSvg from '../../svg/plus.svg';

    const noop = () => {};

    // methods //////////

    const handleAddOutputMapping = () => {
      const id = `transformation_${generateId()}`;

      collection.unshift({
        id,
        name: id,
        description: '',
        mappingType: 'expression'
      });

      onUpdateCollection('outputMappings', collection, {
        lastAddedItemIdx: id
      });
    };


    // exports //////////

    export let collection;
    export let onUpdateCollection = noop;
</script>

<div class="action add add-output-mapping" on:click={handleAddOutputMapping}>
  {@html PlusSvg}
</div>
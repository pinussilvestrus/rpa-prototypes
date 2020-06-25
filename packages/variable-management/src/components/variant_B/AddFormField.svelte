<script>
    import generateId from '../../util/generateId';

    import PlusSvg from '../svg/plus.svg';

    const noop = () => {};

    // methods //////////

    const handleAddFormField = () => {
      const id = `FormField_${generateId()}`;

      collection.unshift({
        id,
        type: '',
        defaultValue: '',
        name: id,
        description: ''
      });

      onUpdateCollection('outputs', collection, {
        lastAddedItemIdx: id
      });
    };


    // exports //////////

    export let collection;
    export let onUpdateCollection = noop;
</script>

<div class="action add add-form-field" on:click={handleAddFormField}>
  {@html PlusSvg}
</div>
<script>
    import dom from 'domtastic';

    import { debounce } from 'min-dash';

    import Section from './Section';

    const noop = () => {};

    // methods //////////

    const handleInput = (event) => {
      const inputNode = dom(event.target);

      onUpdateVariable(variable.id, {
        [inputNode.attr('name')]: inputNode.val()
      });

    };


    // exports //////////

    export let variable;
    export let onUpdateVariable = noop;


    // helpers //////////

    const isInputVariable = (variable) => {
      return variable.type === 'input';
    };
</script>

<Section id="variable-details" title="{isInputVariable(variable) ? 'Input' : 'Output' } Variable" >
  <label>Name</label>
  <input name="name" disabled value="{ variable.name }" />

  <label>Description</label>
  <input name="description" disabled value="{ variable.description }" />

  <label>(Default) Value</label>
  <input 
    name="value"
    on:input={debounce(handleInput, 500)}
    placeholder="{`${isInputVariable(variable) ? 'auto-filled by' : 'auto-written to'} <${variable.name}> process variable`}"
    value="{ variable.value }" />

  <label>Mapping</label>
  <span class="enable-complex-mapping">Enable Complex</span>
  <input 
    name="mapping"
    on:input={debounce(handleInput, 500)}
    placeholder="{`${isInputVariable(variable) ? 'auto-filled by' : 'auto-written to'} <${variable.name}> process variable`}"
    value="{ variable.mapping }" />
</Section>
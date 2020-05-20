<script>
    import Section from './Section';

    // exports //////////

    export let variable;


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
    placeholder="{`${isInputVariable(variable) ? 'auto-filled by' : 'auto-written to'} <${variable.name}> process variable`}"
    value="{ variable.value }" />

  <label>Mapping</label>
  <span class="enable-complex-mapping">Enable Complex</span>
  <input 
    placeholder="{`${isInputVariable(variable) ? 'auto-filled by' : 'auto-written to'} <${variable.name}> process variable`}"
    value="{ variable.mapping }" />
</Section>
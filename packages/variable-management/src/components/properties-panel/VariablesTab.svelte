<script>
  import Section from './Section';

  import './VariablesTab.scss';

  import { variableStore } from '../../stores';

  let variables = [];
  variableStore.subscribe((list) => {
    variables = list;
  });


  // exports //////////

  export let hidden = true;
</script>

<div class="variables-tab" class:hidden="{hidden}">
  <Section id="variables" title="Variables detected in this process">
    <div class="variables-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <!-- <th>Description</th> -->
            <th>Written from</th>
          </tr>
        </thead>
        <tbody>
          {#each variables as variable}
            <tr>
                <td>{variable.name}</td>
                <!-- <td>{variable.description}</td> -->
                <td>{variable.writtenFrom.name}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Section>
</div>

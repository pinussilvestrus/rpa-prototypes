import { writable } from 'svelte/store';

function createVariableStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    set,
    addVariable: (item) => update(list => list.push(item)),
    reset: () => set([])
  };
}

export const variableStore = createVariableStore();
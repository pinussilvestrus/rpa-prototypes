import { writable } from 'svelte/store';

import { find } from 'min-dash';

function createVariableStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    set,
    addVariable: (item) => {
      return update((list) => {

        // prevent duplicates
        if (!find(list, (i) => item.id === i.id)) {
          list.push(item);
        }

        return list;
      });
    },
    reset: () => set([])
  };
}

export const variableStore = createVariableStore();
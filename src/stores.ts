import { writable } from "svelte/store";

const controlsState = writable({
  selectedCategory: "modules",
  selected: "extra large shredder",
  planetsMode: "uniq",
  graphMode: "dagre",
  curvesMode: "taxi",
  mergeUniquePlanets: true,
  showTools: true,
});

export { controlsState };

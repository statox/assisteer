import { writable } from "svelte/store";

const controlsState = writable({
  selectedCategory: "modules",
  selected: "extra large shredder",
  planetsMode: "uniq",
  curvesMode: "taxi",
  mergeUniquePlanets: true,
});

export { controlsState };

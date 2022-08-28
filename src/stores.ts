import { writable } from "svelte/store";

const controlsState = writable({
  selectedCategory: "composite resources",
  selected: "titanium alloy",
  planetsMode: "uniq",
  curvesMode: "taxi",
  mergeUniquePlanets: true,
});

export { controlsState };

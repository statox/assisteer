import { writable, readable } from "svelte/store";
import { RESOURCES } from "./data";

const controlsState = writable({
  selectedCategory: "composite resources",
  selected: "titanium alloy",
  planetsMode: "uniq",
  curvesMode: "taxi",
  mergeUniquePlanets: true,
});

export { controlsState };

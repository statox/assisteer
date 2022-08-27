import { writable, readable } from "svelte/store";
import { RESOURCES } from "./defaults";

const resources = readable(RESOURCES);
const controlsState = writable({
  selected: "titanium alloy",
  planetsMode: "uniq",
  curvesMode: "taxi",
  mergeUniquePlanets: true,
});

export { resources, controlsState };

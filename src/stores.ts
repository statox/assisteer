import { writable } from "svelte/store";
import { searchInCategory } from "./services/resources";
import type { Controls } from "./types/controls.types";
import type { Project } from "./types/project.types";

const defaultControls: Controls = {
  selectedCategory: "modules",
  selected: "extra large shredder",
  planetsMode: "uniq",
  graphMode: "dagre",
  curvesMode: "taxi",
  mergeUniquePlanets: true,
  showTools: true,
};
const storedControlsStr = localStorage.getItem("controls");

let usedControls: Controls = defaultControls;

if (storedControlsStr !== null) {
  usedControls = JSON.parse(storedControlsStr) as Controls;
}

const controlsState = writable<Controls>(usedControls);

controlsState.subscribe((value) => {
  localStorage.setItem("controls", JSON.stringify(value));
});

const project = writable<Project>([]);

export { controlsState, project };

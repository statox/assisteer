import { writable } from "svelte/store";
import { searchInAllObjects, searchInCategory } from "./services/resources";
import type { Controls } from "./types/controls.types";
import type { Project } from "./types/project.types";

const defaultControls: Controls = {
  selectedCategory: "modules",
  selected: searchInCategory("modules", "default"),
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
  // When we store selected it is a GenericObject but when we
  // read it from storage on a new application instance the object
  // doesn't exists anymore in the all objects list so the selection UI
  // is broken
  // To avoid that when we read the stored controls we get a new instance
  // of the object
  const storedSelectedObject = usedControls.selected.name;
  usedControls.selected = searchInAllObjects(storedSelectedObject);
}

const controlsState = writable<Controls>(usedControls);

controlsState.subscribe((value) => {
  localStorage.setItem("controls", JSON.stringify(value));
});

const project = writable<Project>([]);

export { controlsState, project };

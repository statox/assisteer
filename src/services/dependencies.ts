import type {
  Resource,
  ResourceNatural,
  ResourceRefined,
  ResourceComposite,
  ResourceAtmospheric,
  SimpleDepsTree,
  RecursiveDepsTree,
} from "../types";

import { TOOLS } from "../data";
import type { Widget } from "../types/objects.types";
import { searchInAllObjects } from "./resources";

function getResourcesDependencies(resource: Resource) {
  const toolName = resource.needs[0].tool;
  const tool = TOOLS.find((t) => t.name === toolName);

  const dependency = resource.needs[0];
  // If the dependency is a natural resource we create a lead for the planet
  if (["digging", "atmospheric extractor"].includes(dependency.tool)) {
    return {
      resource,
      tool,
      planets: dependency.resources,
    };
  }

  // Otherwise continue the graph with the subdependencies
  const deps = dependency.resources.reduce((g, name) => {
    const r = searchInAllObjects(name);
    g[name] = getResourcesDependencies(r);

    return g;
  }, {});

  return {
    resource,
    tool,
    deps,
  };
}

export { getResourcesDependencies };

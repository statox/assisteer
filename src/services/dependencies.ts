import type { DepsTree, Planet } from "../types";
import type { GenericObject } from "../types/objects.types";
import { TOOLS } from "../data";
import { searchInAllObjects } from "./resources";

function getObjectDependencies(resource: GenericObject): DepsTree {
  const dependency = resource.needs[0];

  const toolName = dependency.tool;
  const tool = TOOLS.find((t) => t.name === toolName);

  // If the dependency is a natural resource we create a lead for the planet
  if (["digging", "atmospheric extractor"].includes(dependency.tool)) {
    return {
      resource,
      tool,
      planets: dependency.resources as Planet[],
    };
  }

  // Otherwise continue the graph with the subdependencies
  const deps = dependency.resources.reduce((g, name) => {
    const r = searchInAllObjects(name);
    g[name] = getObjectDependencies(r);

    return g;
  }, {});

  return {
    resource,
    tool,
    deps,
  };
}

export { getObjectDependencies };

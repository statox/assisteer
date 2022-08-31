import type { DepsTree, Planet } from "../types";
import type { GenericObject } from "../types/objects.types";
import { TOOLS } from "../data";
import { searchInAllObjects } from "./resources";

function getObjectDependencies(
  resource: GenericObject,
  quantity: number
): DepsTree {
  if (!resource?.needs.length) {
    return;
  }
  const dependency = resource.needs[0];

  const toolName = dependency.tool;
  const tool = TOOLS.find((t) => t.name === toolName);

  // If the dependency is a natural resource we create a lead for the planet
  if (["digging", "atmospheric extractor"].includes(dependency.tool)) {
    return {
      resource,
      quantity,
      tool,
      planets: dependency.resources as Planet[],
    };
  }

  // Otherwise continue the graph with the subdependencies
  const deps = dependency.resources.reduce((g, name) => {
    const count = dependency.resources.filter((r) => r === name).length;
    const r = searchInAllObjects(name);
    g[name] = getObjectDependencies(r, count * quantity);

    return g;
  }, {});

  return {
    resource,
    quantity,
    tool,
    deps,
  };
}

export { getObjectDependencies };

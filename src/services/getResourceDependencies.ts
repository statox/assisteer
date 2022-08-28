import type {
  Resource,
  ResourceNatural,
  ResourceRefined,
  ResourceComposite,
  ResourceAtmospheric,
  SimpleDepsTree,
  RecursiveDepsTree,
  Widget,
} from "../types/stores.types";

import { RESOURCES, TOOLS } from "../data";

function getResourcesDependencies(resource: Resource) {
  if (resource.type === "natural" || resource.type === "atmospheric") {
    return getNaturalResourceDependencies(resource);
  }
  return getRefinedResourceDependencies(resource);
}

function getNaturalResourceDependencies(
  resource: ResourceNatural | ResourceAtmospheric
): SimpleDepsTree {
  let tool = TOOLS.find((t) => t.name === "digging");
  if (resource.type === "atmospheric") {
    tool = TOOLS.find((t) => t.name === "atmospheric extractor");
  }

  return {
    resource,
    tool,
    planets: resource.planets,
  };
}

function getRefinedResourceDependencies(
  resource: ResourceRefined | ResourceComposite | Widget
): RecursiveDepsTree {
  const toolName = resource.needs[0].tool;
  const tool = TOOLS.find((t) => t.name === toolName);

  const deps = resource.needs[0].resources.reduce((g, name) => {
    const r = RESOURCES.find((i) => i.name === name);
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

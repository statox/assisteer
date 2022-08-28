import type {
  Resource,
  ResourceNatural,
  ResourceRefined,
  ResourceComposite,
  ResourceAtmospheric,
  DepsTree,
  SimpleDepsTree,
  RecursiveDepsTree,
} from "../types/stores.types";

import { RESOURCES, TOOLS } from "../defaults";

function getResourcesDependencies(resource: Resource) {
  if (resource.type === "natural" || resource.type === "atmospheric") {
    return getNaturalResourceDependencies(resource);
  }
  if (resource.type === "refined" || resource.type === "composite") {
    return getRefinedResourceDependencies(resource);
  }
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
  resource: ResourceRefined | ResourceComposite
): RecursiveDepsTree {
  let tool = TOOLS.find((t) => t.name === "smelting furnace");
  if (resource.type === "composite") {
    tool = TOOLS.find((t) => t.name === "chemistry lab");
  }

  const deps = resource.needs.reduce((g, name) => {
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

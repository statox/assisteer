import type {
  Resource,
  ResourceNatural,
  ResourceRefined,
  ResourceComposite,
  ResourceAtmospheric,
} from "../types/stores.types";

import { RESOURCES } from "../defaults";

function getResourcesDependencies(resource: Resource) {
  console.log("deps for", resource.name, "-", resource.type);
  if (resource.type === "natural" || resource.type === "atmospheric") {
    return getNaturalResourceDependencies(resource);
  }
  if (resource.type === "refined" || resource.type === "composite") {
    return getRefinedResourceDependencies(resource);
  }
}

function getNaturalResourceDependencies(
  resource: ResourceNatural | ResourceAtmospheric
) {
  let tool = "digging";
  if (resource.type === "atmospheric") {
    tool = "atmospheric extractor";
  }

  return {
    tool,
    planets: resource.planets,
  };
}

function getRefinedResourceDependencies(
  resource: ResourceRefined | ResourceComposite
) {
  let tool = "smelting furnace";
  if (resource.type === "composite") {
    tool = "chemitry lab";
  }

  const deps = resource.needs.reduce((g, name) => {
    const r = RESOURCES.find((i) => i.name === name);
    g[name] = getResourcesDependencies(r);

    return g;
  }, {});

  return {
    tool,
    deps,
  };
}

export { getResourcesDependencies };

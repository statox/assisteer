import type { GenericObject, Tool } from "./objects.types";
import type { Planet } from "./resources.types";

type DepsTree = SimpleDepsTree | RecursiveDepsTree;

type SimpleDepsTree = {
  resource: GenericObject;
  tool: Tool;
  planets: Planet[];
};

type RecursiveDepsTree = {
  resource: GenericObject;
  tool: Tool;
  deps?: {
    [k: string]: DepsTree;
  };
};

export type { DepsTree, RecursiveDepsTree, SimpleDepsTree };

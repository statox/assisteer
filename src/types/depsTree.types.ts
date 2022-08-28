import type { Planet, Resource } from "./resources.types";
import type { Tool } from "./stores.types";

type DepsTree = SimpleDepsTree | RecursiveDepsTree;

type SimpleDepsTree = {
  resource: Resource;
  tool: Tool;
  planets: "all" | Planet[];
};

type RecursiveDepsTree = {
  resource: Resource;
  tool: Tool;
  deps?: {
    [k: string]: DepsTree;
  };
};

export type { DepsTree, RecursiveDepsTree, SimpleDepsTree };

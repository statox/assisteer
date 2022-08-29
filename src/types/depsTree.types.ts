import type { Tool } from "./objects.types";
import type { Planet, Resource } from "./resources.types";

type DepsTree = SimpleDepsTree | RecursiveDepsTree;

type SimpleDepsTree = {
  resource: Resource;
  tool: Tool;
  planets: "all" | Planet[];
};

type RecursiveDepsTree = {
  resource: Resource;
  tool: Tool;
  quantity?: number;
  deps?: {
    [k: string]: DepsTree;
  };
};

export type { DepsTree, RecursiveDepsTree, SimpleDepsTree };

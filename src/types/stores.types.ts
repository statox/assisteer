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
  deps?: {
    [k: string]: DepsTree;
  };
};

type ToolDependency = {
  tool: string;
  resources: string[];
};

type Tool = {
  name: string;
  icon: string;
};

type Widget = {
  name: string;
  type: "widget";
  icon: string;
  needs: ToolDependency[];
};

export type {
  DepsTree,
  RecursiveDepsTree,
  SimpleDepsTree,
  Tool,
  ToolDependency,
  Widget,
};

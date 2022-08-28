type Planet =
  | "atrox"
  | "calidor"
  | "sylva"
  | "vesania"
  | "glacio"
  | "desolo"
  | "novus";

type Resource =
  | ResourceNatural
  | ResourceRefined
  | ResourceAtmospheric
  | ResourceComposite
  | Widget;

type ResourceGeneric = {
  name: string;
  icon: string;
};
type ResourceNatural = ResourceGeneric & {
  type: "natural";
  planets: "all" | Planet[];
};

type ResourceRefined = ResourceGeneric & {
  type: "refined";
  needs: ToolDependency[];
};

type ResourceAtmospheric = ResourceGeneric & {
  type: "atmospheric";
  planets: "all" | Planet[];
};

type ResourceComposite = ResourceGeneric & {
  type: "composite";
  needs: ToolDependency[];
};

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
  Resource,
  ResourceNatural,
  ResourceRefined,
  ResourceAtmospheric,
  ResourceComposite,
  Tool,
  Widget,
};

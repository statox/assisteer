type ResourceType = "natural" | "refined";

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

type ResourceNatural = {
  name: string;
  type: "natural";
  planets: "all" | Planet[];
  icon: string;
};

type ResourceRefined = {
  name: string;
  type: "refined";
  needs: ToolDependency[];
  icon: string;
};

type ResourceAtmospheric = {
  name: string;
  type: "atmospheric";
  planets: "all" | Planet[];
  icon: string;
};

type ResourceComposite = {
  name: string;
  type: "composite";
  needs: ToolDependency[];
  icon: string;
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

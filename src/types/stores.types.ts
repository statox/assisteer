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
  | ResourceComposite;

type ResourceNatural = {
  name: string;
  type: "natural";
  planets: "all" | Planet[];
  icon: string;
};

type ResourceRefined = {
  name: string;
  type: "refined";
  needs: string[];
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
  needs: string[];
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

type Tool = {
  name: string;
  icon: string;
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
};

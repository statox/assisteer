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
};

type ResourceRefined = {
  name: string;
  type: "refined";
  needs: string[];
};

type ResourceAtmospheric = {
  name: string;
  type: "atmospheric";
  planets: "all" | Planet[];
};

type ResourceComposite = {
  name: string;
  type: "composite";
  needs: string[];
};

type DepsTree = SimpleDepsTree | RecursiveDepsTree;

type SimpleDepsTree = {
  resource: string;
  tool: string;
  planets: "all" | Planet[];
};

type RecursiveDepsTree = {
  resource: string;
  tool: string;
  deps?: {
    [k: string]: DepsTree;
  };
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

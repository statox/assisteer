import type { ToolDependency } from "./helper.types";
import type { Widget } from "./objects.types";

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

export type {
  Planet,
  Resource,
  ResourceNatural,
  ResourceRefined,
  ResourceAtmospheric,
  ResourceComposite,
};

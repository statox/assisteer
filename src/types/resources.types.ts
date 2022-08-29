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
  needs: ToolDependency[];
};
type ResourceNatural = ResourceGeneric & {
  type: "natural";
};

type ResourceRefined = ResourceGeneric & {
  type: "refined";
};

type ResourceAtmospheric = ResourceGeneric & {
  type: "atmospheric";
};

type ResourceComposite = ResourceGeneric & {
  type: "composite";
};

export type {
  Planet,
  Resource,
  ResourceNatural,
  ResourceRefined,
  ResourceAtmospheric,
  ResourceComposite,
};

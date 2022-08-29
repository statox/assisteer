import type { GenericObject } from "./objects.types";

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

type ResourceNatural = GenericObject & {
  type: "natural";
};

type ResourceRefined = GenericObject & {
  type: "refined";
};

type ResourceAtmospheric = GenericObject & {
  type: "atmospheric";
};

type ResourceComposite = GenericObject & {
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

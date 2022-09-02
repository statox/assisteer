import type { GenericObject } from "./objects.types";

type Planet =
  | "atrox"
  | "calidor"
  | "sylva"
  | "vesania"
  | "glacio"
  | "desolo"
  | "novus";

type ResourceType =
  | "natural"
  | "refined"
  | "atmospheric"
  | "composite"
  | "soil"
  | "hydrazine";

type Resource =
  | ResourceNatural
  | ResourceRefined
  | ResourceAtmospheric
  | ResourceComposite
  | ResourceSpecial;

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

type ResourceSpecial = GenericObject & {
  type: "special_resource";
};

export type {
  Planet,
  Resource,
  ResourceAtmospheric,
  ResourceComposite,
  ResourceNatural,
  ResourceRefined,
  ResourceSpecial,
  ResourceType,
};

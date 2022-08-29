import type { ToolDependency } from "./helper.types";

type GenericObject = {
  name: string;
  icon: string;
  needs: ToolDependency[];
};

type Tool = {
  name: string;
  icon: string;
};

type Tier = 1 | 2 | 3 | 4;

type Widget = GenericObject & {
  type: "widget";
};

type Augment = GenericObject & {
  type: "augment";
  bytes: number;
  powerDrain: number;
};

type Platform = GenericObject & {
  type: "platform";
  powerConnectors: number;
  bytes: number;
  smallSlots?: number;
  mediumSlots?: number;
  largeSlots?: number;
  extraLargeSlots?: number;
};

type Module = GenericObject & {
  type: "module";
  tier: Tier;
};

type Vehicule = GenericObject & {
  type: "vehicule";
  bytes: number;
  smallSlots?: number;
  mediumSlots?: number;
  largeSlots?: number;
  extraLargeSlots?: number;
};

export type {
  Augment,
  GenericObject,
  Module,
  Platform,
  Tool,
  Vehicule,
  Widget,
};

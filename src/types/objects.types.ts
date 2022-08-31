import type { ToolDependency } from "./helper.types";

type ObjectType =
  | "natural"
  | "refined"
  | "atmospheric"
  | "composite"
  | "widget"
  | "augment"
  | "platform"
  | "vehicule"
  | "module"
  | "power_source"
  | "power_storage";

type GenericObject = {
  name: string;
  icon: string;
  type: ObjectType;
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

type PowerSource = GenericObject & {
  type: "power_source";
  output: number;
  bytes: number;
  tier: Tier;
};

type PowerStorage = GenericObject & {
  type: "power_storage";
  output: number;
  capacity: number;
  bytes: number;
  tier: number;
};

export type {
  Augment,
  GenericObject,
  Module,
  ObjectType,
  Platform,
  PowerSource,
  PowerStorage,
  Tool,
  Vehicule,
  Widget,
};

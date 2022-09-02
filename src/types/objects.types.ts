import type { ToolDependency } from "./helper.types";
import type { StorageCapacity } from "./storages.types";

type ObjectType =
  | "natural"
  | "refined"
  | "atmospheric"
  | "composite"
  | "special_resource"
  | "widget"
  | "augment"
  | "platform"
  | "vehicule"
  | "module"
  | "power_source"
  | "power_storage"
  | "automation_tool"
  | "storage"
  | "canister";

type GenericObject = {
  name: string;
  icon: string;
  type: ObjectType;
  needs: ToolDependency[];
};

type ResearchableObject = GenericObject & {
  bytes: number;
};

type PowerConsumer = {
  powerDrain: number;
};

type Tool = {
  name: string;
  icon: string;
};

type Tier = 1 | 2 | 3 | 4;

type Widget = GenericObject & {
  type: "widget";
};

type Augment = GenericObject &
  PowerConsumer &
  ResearchableObject & {
    type: "augment";
  };

type Platform = GenericObject &
  ResearchableObject & {
    type: "platform";
    powerConnectors: number;
    storageCapacity: StorageCapacity;
  };

type Module = GenericObject & {
  type: "module";
  tier: Tier;
};

type Vehicule = GenericObject &
  ResearchableObject & {
    type: "vehicule";
    bytes: number;
    storageCapacity: StorageCapacity;
  };

type PowerSource = GenericObject &
  ResearchableObject & {
    type: "power_source";
    output: number;
    tier: Tier;
  };

type PowerStorage = GenericObject &
  ResearchableObject & {
    type: "power_storage";
    output: number;
    capacity: number;
    tier: number;
  };

type AutomationTool = GenericObject &
  PowerConsumer &
  ResearchableObject & { tier: number };

export type {
  Augment,
  AutomationTool,
  GenericObject,
  Module,
  ObjectType,
  Platform,
  PowerSource,
  PowerStorage,
  ResearchableObject,
  Tool,
  Tier,
  Vehicule,
  Widget,
};

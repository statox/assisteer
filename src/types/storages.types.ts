import type { GenericObject, ResearchableObject, Tier } from "./objects.types";
import type { ResourceType } from "./resources.types";

type StorageCapacity = {
  smallSlots?: number;
  mediumSlots?: number;
  largeSlots?: number;
  extraLargeSlots?: number;
};

type Storage = ResearchableObject & {
  type: "storage";
  tier: Tier;
  storageCapacity: StorageCapacity;
};

type Canister = ResearchableObject & {
  type: "canister";
  tier: Tier;
  resourceTypes: ResourceType[];
  capacity: number;
};

export type { Canister, StorageCapacity, Storage };

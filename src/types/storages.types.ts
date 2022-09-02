import type { GenericObject, ResearchableObject, Tier } from "./objects.types";

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

export type { StorageCapacity, Storage };

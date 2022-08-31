import type { GenericObject } from "./objects.types";

type Stats = {
  resources: {
    // The keys are actually objects categories
    [k: string]: {
      resource: GenericObject;
      count: number;
    }[];
  };
};

export type { Stats };

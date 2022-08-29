import type { GenericObject } from "./objects.types";

type Stats = {
  product: string;
  resources: {
    [k: string]: {
      resource: GenericObject;
      count: number;
    }[];
  };
};

export type { Stats };

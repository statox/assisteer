import type { GenericObject } from "./objects.types";

type Controls = {
  selectedCategory: string;
  selected: GenericObject;
  planetsMode: string;
  graphMode: string;
  curvesMode: string;
  mergeUniquePlanets: boolean;
  showTools: boolean;
};

export type { Controls };

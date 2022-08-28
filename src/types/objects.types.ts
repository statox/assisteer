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

type Module = GenericObject & {
  type: "module";
  tier: Tier;
};

export type { Module, Tool, Widget };

import type { ToolDependency } from "./helper.types";

type Tool = {
  name: string;
  icon: string;
};

type Widget = {
  name: string;
  type: "widget";
  icon: string;
  needs: ToolDependency[];
};

export type { Tool, Widget };

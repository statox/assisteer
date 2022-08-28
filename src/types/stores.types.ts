type ToolDependency = {
  tool: string;
  resources: string[];
};

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

export type { Tool, ToolDependency, Widget };

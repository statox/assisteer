import type { AutomationTool } from "../types/objects.types";

const AUTOMATION_TOOLS: AutomationTool[] = [
  {
    name: "auto arm",
    type: "automation_tool",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/05/Auto_Arm.png",
    needs: [{ tool: "small printer", resources: ["aluminum", "graphite"] }],
    powerDrain: 1,
    bytes: 1500,
    tier: 2,
  },
  {
    name: "auto extractor",
    type: "automation_tool",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/af/Auto_Extractor.png",
    needs: [
      {
        tool: "large printer",
        resources: ["exo chip", "rubber", "tungsten carbide", "steel"],
      },
    ],
    powerDrain: 8,
    bytes: 7500,
    tier: 4,
  },
];

export { AUTOMATION_TOOLS };

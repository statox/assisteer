import type { PowerSource } from "../../types/objects.types";

const POWER_SOURCES: PowerSource[] = [
  {
    name: "rtg",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/87/RTG.png",
    needs: [
      { tool: "small printer", resources: ["lithium", "nanocarbon alloy"] },
    ],
    output: 4,
    bytes: 12500,
    tier: 2,
  },
];

export { POWER_SOURCES };

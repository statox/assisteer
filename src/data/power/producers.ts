import type { PowerSource } from "../../types/objects.types";

// https://astroneer.fandom.com/wiki/Power
const POWER_SOURCES: PowerSource[] = [
  {
    name: "small solar panel",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/a6/Small_Solar_Panel.png",
    needs: [{ tool: "backpack", resources: ["copper"] }],
    output: 1,
    bytes: 300,
    tier: 1,
  },
  {
    name: "small wind turbine",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/e/ed/Small_Wind_Turbine.png",
    needs: [{ tool: "backpack", resources: ["ceramic"] }],
    output: 1.5,
    bytes: 300,
    tier: 1,
  },
  {
    name: "small generator",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/45/Small_Generator.png",
    needs: [{ tool: "backpack", resources: ["compound"] }],
    output: 2,
    bytes: 0,
    tier: 1,
  },
  {
    name: "medium solar panel",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d4/Medium_Solar_Panel.png",
    needs: [{ tool: "small printer", resources: ["copper", "glass"] }],
    output: 4,
    bytes: 2000,
    tier: 2,
  },
  {
    name: "medium wind turbine",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/9a/Medium_Wind_Turbine.jpg",
    needs: [{ tool: "small printer", resources: ["aluminum", "ceramic"] }],
    output: 5,
    bytes: 2500,
    tier: 2,
  },
  {
    name: "medium generator",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/1d/Medium_Generator.png",
    needs: [{ tool: "small printer", resources: ["tungsten", "aluminum"] }],
    output: 9,
    bytes: 2000,
    tier: 2,
  },
  {
    name: "large solar panel",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/59/Large_Solar_Panel.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["copper", "glass", "aluminum alloy"],
      },
    ],
    output: 8,
    bytes: 4000,
    tier: 3,
  },
  {
    name: "large wind turbine",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/6/6d/Large_Wind_Turbine.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["ceramic", "glass", "aluminum alloy"],
      },
    ],
    output: 10,
    bytes: 3500,
    tier: 3,
  },
  {
    name: "solar array",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/98/Solar_Array.png",
    needs: [
      {
        tool: "large printer",
        resources: ["copper", "glass", "aluminum alloy", "graphene"],
      },
    ],
    output: 14,
    bytes: 6000,
    tier: 4,
  },
  {
    name: "xl wind turbine",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d3/XL_Wind_Turbine.png",
    needs: [
      {
        tool: "large printer",
        resources: ["ceramic", "iron", "aluminum alloy", "graphene"],
      },
    ],
    output: 14,
    bytes: 6000,
    tier: 4,
  },
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
  {
    name: "power cells",
    type: "power_source",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d5/Power-cells.png",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/9b/Icon_Power_Cells.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Power_Cells",
    needs: [{ tool: "backpack", resources: ["graphite"] }],
    output: 1,
    bytes: 800,
    tier: 1,
  },
];

export { POWER_SOURCES };

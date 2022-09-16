import type { Widget } from "../types/objects.types";

// https://astroneer.fandom.com/wiki/Widgets
const WIDGETS: Widget[] = [
  {
    name: "small battery",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/af/Small_Battery.jpg",
    needs: [{ tool: "backpack", resources: ["zinc"] }],
  },
  {
    name: "oxygen tank",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/b7/SmallTank.jpg",
    needs: [{ tool: "backpack", resources: ["glass"] }],
  },
  {
    name: "portable oxygenator",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/35/PortableOxygenator.png",
    needs: [{ tool: "backpack", resources: ["nanocarbon alloy"] }],
  },
  {
    name: "worklight",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/33/Worklight.png",
    needs: [
      { tool: "backpack", resources: ["copper"] },
      { tool: "small printer", resources: ["copper"] },
    ],
  },
  {
    name: "floodlight",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/1b/Floodlight.png",
    needs: [
      { tool: "backpack", resources: ["tungsten"] },
      { tool: "small printer", resources: ["tungsten"] },
    ],
  },
  {
    name: "small camera",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/b6/Small_Camera.jpg",
    needs: [{ tool: "backpack", resources: ["exo chip"] }],
  },
  {
    name: "tethers",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fc/Tethers.png",
    needs: [{ tool: "backpack", resources: ["compound"] }],
  },
  {
    name: "extenders",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/c/c9/Extender.jpg",
    needs: [
      { tool: "backpack", resources: ["copper"] },
      { tool: "small printer", resources: ["copper"] },
    ],
  },
  {
    name: "probe scanner",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/84/Probe_Scanner.jpg",
    needs: [{ tool: "backpack", resources: ["steel"] }],
  },
];

export { WIDGETS };

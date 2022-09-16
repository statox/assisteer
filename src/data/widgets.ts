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
    name: "packager",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/c/c1/Packager.png",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/e/e9/Icon_Packager.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Packager",
    needs: [{ tool: "backpack", resources: ["graphite"] }],
    bytesToUnlock: 1000
  },
  {
    name: "leveling block",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/1b/Leveling_Block_T.png",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/4b/Icon_Leveling_Block.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Leveling_Block",
    needs: [{ tool: "backpack", resources: ["soil"] }],
    bytesToUnlock: 0
  },
  {
    name: "oxygen tank",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/b7/SmallTank.jpg",
    needs: [{ tool: "backpack", resources: ["glass"] }],
  },
  {
    name: "oxygen filter",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/35/Filter.png",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/10/Icon_Oxygen_Tank.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Oxygen_Filters",
    needs: [{ tool: "backpack", resources: ["resin"] }],
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
    name: "beacon",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/b3/Beacon.png",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/09/Icon_Beacon.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Beacon",
    needs: [{ tool: "backpack", resources: ["quartz"] }],
    bytesToUnlock: 0
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
    name: "glowsticks",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/50/Glowsticks.jpg",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d3/Icon_Worklight.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Glowsticks",
    needs: [{ tool: "backpack", resources: ["organic"] }],
    bytesToUnlock: 350
  },
  {
    name: "small camera",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/b6/Small_Camera.jpg",
    needs: [{ tool: "backpack", resources: ["exo chip"] }],
  },
  {
    name: "dynamite",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/8c/Dynamite_T.png",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/08/Icon_Dynamite.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Dynamite",
    needs: [
        { tool: "backpack", resources: ["explosive powder"] },
        { tool: "small printer", resources: ["explosive powder"] }
    ],
    bytesToUnlock: 3750
  },
  {
    name: "fireworks",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/6/67/Fireworks.jpg",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d0/Icon_Fireworks.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Fireworks",
    needs: [
        { tool: "backpack", resources: ["explosive powder"] },
        { tool: "small printer", resources: ["explosive powder"] }
    ],
    bytesToUnlock: 3750
  },
  {
    name: "small trumpet horn",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fa/Small_Trumpet_Horn.jpg",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/11/Icon_Horn.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Small_Trumpet_Horn",
    needs: [{ tool: "backpack", resources: ["resin"] }],
  },
  {
    name: "holographic figurine",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/b3/Holographic_Figurine.jpg",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/10/Icon_Figurine.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Holographic_Figurine",
    needs: [{ tool: "backpack", resources: ["plastic"] }],
    bytesToUnlock: 3000
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
    name: "solid fuel jump jet",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/b8/Solid-Fuel_Jump_Jet.jpg",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/e/ea/Icon_Thruster.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Solid-Fuel_Jump_Jet",
    needs: [{ tool: "backpack", resources: ["aluminum alloy"] }],
    bytesToUnlock: 5000
  },
  {
    name: "hydrazine jet pack",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/6/6e/Hydrazine_Jet_Pack.jpg",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/e/ea/Icon_Thruster.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Hydrazine_Jet_Pack",
    needs: [{ tool: "backpack", resources: ["aluminum alloy"] }],
    bytesToUnlock: 5000
  },
  {
    name: "probe scanner",
    type: "widget",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/84/Probe_Scanner.jpg",
    needs: [{ tool: "backpack", resources: ["steel"] }],
  },
];

export { WIDGETS };

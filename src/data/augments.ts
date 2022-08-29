import type { Augment } from "../types/objects.types";

// https://astroneer.fandom.com/wiki/Augments
const AUGMENTS: Augment[] = [
  {
    name: "inhibitor mod",
    type: "augment",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fc/Inhibitor_Mod.png",
    needs: [
      {
        tool: "backpack",
        resources: ["zinc"],
      },
    ],
    bytes: 1000,
    powerDrain: 0.2,
  },
  {
    name: "boost mod",
    type: "augment",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/c/cc/Boost_Mod.png",
    needs: [
      {
        tool: "backpack",
        resources: ["zinc"],
      },
    ],
    bytes: 1000,
    powerDrain: 0.75,
  },
  {
    name: "narrow mod",
    type: "augment",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/4e/Narrow_Mod.png",
    needs: [
      {
        tool: "backpack",
        resources: ["zinc"],
      },
    ],
    bytes: 1000,
    powerDrain: 0.5,
  },
  {
    name: "wide mod",
    type: "augment",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/34/Wide_Mod.png",
    needs: [
      {
        tool: "backpack",
        resources: ["zinc"],
      },
    ],
    bytes: 1000,
    powerDrain: 0.5,
  },
  {
    name: "alignment mod",
    type: "augment",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/81/Alignment_Mod.png",
    needs: [
      {
        tool: "backpack",
        resources: ["zinc"],
      },
    ],
    bytes: 1000,
    powerDrain: 0.5,
  },
  {
    name: "terrain analyzer",
    type: "augment",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fa/Terrain_Analyzer.png",
    needs: [
      {
        tool: "backpack",
        resources: ["zinc"],
      },
    ],
    bytes: 2000,
    powerDrain: 0.5,
  },
  {
    name: "drill mod 1",
    type: "augment",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/f5/Drill_Mod_1.png",
    needs: [
      {
        tool: "backpack",
        resources: ["ceramic"],
      },
    ],
    bytes: 1000,
    powerDrain: 0.25,
  },
  {
    name: "drill mod 2",
    type: "augment",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/bd/Drill_Mod_2.png",
    needs: [
      {
        tool: "backpack",
        resources: ["tungsten carbide"],
      },
    ],
    bytes: 2500,
    powerDrain: 0.5,
  },
  {
    name: "drill mod 3",
    type: "augment",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/79/Drill_Mod_3.png",
    needs: [
      {
        tool: "backpack",
        resources: ["diamond"],
      },
    ],
    bytes: 3750,
    powerDrain: 0.75,
  },
];

export { AUGMENTS };

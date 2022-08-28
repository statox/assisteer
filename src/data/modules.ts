import type { Module } from "../types";

// https://astroneer.fandom.com/wiki/Modules
// https://astroneer.fandom.com/wiki/Category:Module_icons
const MODULES: Module[] = [
  {
    name: "small printer",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/6/6c/Small_Printer.png",
    needs: [{ tool: "backpack", resources: ["compound"] }],
    tier: 1,
  },
  {
    name: "medium printer",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/52/Medium_Printer.png",
    needs: [{ tool: "small printer", resources: ["compound"] }],
    tier: 2,
  },
  {
    name: "medium shredder",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/57/Medium_shredder.png",
    needs: [{ tool: "small printer", resources: ["iron", "iron"] }],
    tier: 2,
  },
  {
    name: "large printer",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/7e/Large_Printer.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["compound", "compound", "compound"],
      },
    ],
    tier: 3,
  },
  {
    name: "smelting furnace",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/79/Smelting_Furnace.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["resin", "resin", "compound"],
      },
    ],
    tier: 3,
  },
  {
    name: "soil centifuge",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/dc/Soil_Centrifuge_mp.jpg",
    needs: [
      {
        tool: "medium printer",
        resources: ["compound", "compound", "aluminum"],
      },
    ],
    tier: 3,
  },
  {
    name: "chemistry lab",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d2/Chemistry_Lab.jpg",
    needs: [
      {
        tool: "medium printer",
        resources: ["tungsten", "glass", "ceramic"],
      },
    ],
    tier: 3,
  },
  {
    name: "atmospheric condenser",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/02/Apt_condensor.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["plastic", "glass", "iron"],
      },
    ],
    tier: 3,
  },
  {
    name: "research chamber",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/f9/Research_Chamber.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["compound", "compound", "resin"],
      },
    ],
    tier: 3,
  },
  {
    name: "exo request platform",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/46/EXO_Request_Platform.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["resin", "resin", "ceramic"],
      },
    ],
    tier: 3,
  },
  {
    name: "trade platform",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/82/Trade_Platform.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["exo chip", "tungsten", "iron"],
      },
    ],
    tier: 3,
  },
  {
    name: "large shredder",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/3d/Large_shredder.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["exo chip", "tungsten carbide", "iron"],
      },
    ],
    tier: 3,
  },
  {
    name: "crane",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/4f/Crane.jpg",
    needs: [
      {
        tool: "medium printer",
        resources: ["steel", "silicone", "titanium"],
      },
    ],
    tier: 3,
  },
  {
    name: "extra large shredder",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/16/Extra_Large_Shredder.png",
    needs: [
      {
        tool: "large printer",
        resources: ["exo chip", "exo chip", "tungsten carbide", "steel"],
      },
    ],
    tier: 4,
  },
];

export { MODULES };

import type { ResourceNatural } from "../../types";

// TODO get the images locally instead of getting them from wikia
// https://astroneer.fandom.com/wiki/Category:Resource_icons
const NATURAL_RESOURCES: ResourceNatural[] = [
  {
    name: "soil",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/57/Icon_Soil.png",
  },
  {
    name: "organic",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/90/Icon_Organic.png",
  },
  {
    name: "compound",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/9a/Icon_Compound.png",
  },
  {
    name: "resin",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/e/e0/Icon_Resin.png",
  },
  {
    name: "clay",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/4e/Icon_Clay.png",
  },
  {
    name: "quartz",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fc/Icon_Quartz.png",
  },
  {
    name: "ammonium",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/30/Icon_Ammonium.png",
  },
  {
    name: "graphite",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/c/c1/Icon_Graphite.png",
  },
  {
    name: "laterite",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/05/Icon_Laterite.png",
  },
  {
    name: "astronium",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/3c/Icon_Astronium.png",
  },
  {
    name: "sphalerite",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["sylva", "desolo"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/5d/Icon_Sphalerite.png",
  },
  {
    name: "wolframite",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["desolo", "calidor"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/ae/Icon_Wolframite.png",
  },
  {
    name: "malachite",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["sylva", "calidor"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/3b/Icon_Malachite.png",
  },
  {
    name: "lithium",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["vesania", "novus"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/20/Icon_Lithium.png",
  },
  {
    name: "hematite",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["glacio", "novus"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/75/Icon_Hematite.png",
  },
  {
    name: "titanite",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["vesania", "glacio"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d8/Icon_Titanite.png",
  },
  {
    name: "exo chip",
    type: "natural",
    needs: [
      {
        tool: "digging",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fa/Icon_EXO_Chip.png",
  },
];

export { NATURAL_RESOURCES };

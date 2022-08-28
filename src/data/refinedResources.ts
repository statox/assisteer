import type { ResourceRefined } from "../types/resources.types";

// TODO get the images locally instead of getting them from wikia
// https://astroneer.fandom.com/wiki/Category:Resource_icons
const REFINED_RESOURCES: ResourceRefined[] = [
  {
    name: "carbon",
    type: "refined",
    needs: [
      {
        tool: "smelting furnace",
        resources: ["organic"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d1/Icon_Carbon.png",
  },
  {
    name: "ceramic",
    type: "refined",
    needs: [
      {
        tool: "smelting furnace",
        resources: ["clay"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/03/Icon_Ceramic.png",
  },
  {
    name: "glass",
    type: "refined",
    needs: [
      {
        tool: "smelting furnace",
        resources: ["quartz"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/76/Icon_Glass.png",
  },
  {
    name: "aluminum",
    type: "refined",
    needs: [
      {
        tool: "smelting furnace",
        resources: ["laterite"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/ac/Icon_Aluminum.png",
  },
  {
    name: "zinc",
    type: "refined",
    needs: [
      {
        tool: "smelting furnace",
        resources: ["sphalerite"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/85/Icon_Zinc.png",
  },
  {
    name: "copper",
    type: "refined",
    needs: [
      {
        tool: "smelting furnace",
        resources: ["malachite"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/db/Icon_Copper.png",
  },
  {
    name: "tungsten",
    type: "refined",
    needs: [
      {
        tool: "smelting furnace",
        resources: ["wolframite"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/91/Icon_Tungsten.png",
  },
  {
    name: "iron",
    type: "refined",
    needs: [
      {
        tool: "smelting furnace",
        resources: ["hematite"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/71/Icon_Iron.png",
  },
  {
    name: "titanium",
    type: "refined",
    needs: [
      {
        tool: "smelting furnace",
        resources: ["titanite"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/2a/Icon_Titanium.png",
  },
];

export { REFINED_RESOURCES };

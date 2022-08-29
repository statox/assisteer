import type { ResourceAtmospheric } from "../types";

// TODO get the images locally instead of getting them from wikia
// https://astroneer.fandom.com/wiki/Category:Resource_icons
const ATMOSPHERIC_RESOURCES: ResourceAtmospheric[] = [
  {
    name: "hydrogen",
    type: "atmospheric",
    needs: [
      {
        tool: "atmospheric extractor",
        resources: ["sylva", "calidor", "vesania", "novus"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/42/Icon_Hydrogen.png",
  },
  {
    name: "argon",
    type: "atmospheric",
    needs: [
      {
        tool: "atmospheric extractor",
        resources: ["vesania", "glacio"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/24/Icon_Argon.png",
  },
  {
    name: "methane",
    type: "atmospheric",
    needs: [
      {
        tool: "atmospheric extractor",
        resources: ["novus", "atrox"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/14/Icon_Methane.png",
  },
  {
    name: "nitrogen",
    type: "atmospheric",
    needs: [
      {
        tool: "atmospheric extractor",
        resources: ["sylva", "vesania", "atrox"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/e/e2/Icon_Nitrogen.png",
  },
  {
    name: "sulfur",
    type: "atmospheric",
    needs: [
      {
        tool: "atmospheric extractor",
        resources: ["calidor", "atrox"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/45/Icon_Sulfur.png",
  },
  {
    name: "helium",
    type: "atmospheric",
    needs: [
      {
        tool: "atmospheric extractor",
        resources: ["atrox"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/79/Icon_Helium.png",
  },
];

export { ATMOSPHERIC_RESOURCES };

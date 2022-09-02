import type { ResourceSpecial } from "../../types";

// https://astroneer.fandom.com/wiki/Resources
const SPECIAL_RESOURCES: ResourceSpecial[] = [
  {
    name: "scrap",
    type: "special_resource",
    needs: [
      {
        tool: "shredding",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/97/Nugget_Scrap.png",
  },
  {
    name: "exo chip",
    type: "special_resource",
    needs: [
      {
        tool: "exo cache",
        resources: ["all"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fa/Icon_EXO_Chip.png",
  },
];

export { SPECIAL_RESOURCES };

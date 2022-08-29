import type { Vehicule } from "../types/objects.types";

const SHUTTLES: Vehicule[] = [
  {
    name: "small shuttle",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/b9/Small_Shuttle.png",
    needs: [
      {
        tool: "large printer",
        resources: ["aluminum", "aluminum"],
      },
    ],
    bytes: 1500,
    mediumSlots: 1,
  },
  {
    name: "medium shuttle",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/7b/Medium_Shuttle.png",
    needs: [
      {
        tool: "large printer",
        resources: ["ceramic", "ceramic", "aluminum alloy"],
      },
    ],
    bytes: 3750,
    mediumSlots: 3,
  },
  {
    name: "large shuttle",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/a5/Large_Shuttle.png",
    needs: [
      {
        tool: "large printer",
        resources: ["exo chip", "exo chip", "titanium alloy", "ceramic"],
      },
    ],
    bytes: 5000,
    mediumSlots: 1,
    largeSlots: 2,
  },
];

export { SHUTTLES };

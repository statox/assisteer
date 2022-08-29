import type { Vehicule } from "../../types/objects.types";

const ROVERS: Vehicule[] = [
  {
    name: "tractor",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/7a/Tractor.png",
    needs: [
      {
        tool: "small printer",
        resources: ["aluminum", "aluminum"],
      },
    ],
    bytes: 1000,
    mediumSlots: 1,
  },
  {
    name: "trailer",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/58/Trailer.png",
    needs: [
      {
        tool: "small printer",
        resources: ["compound", "aluminum"],
      },
    ],
    bytes: 1500,
    mediumSlots: 1,
  },
  {
    name: "buggy",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/48/Buggy.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["compound", "aluminum"],
      },
    ],
    bytes: 1500,
    smallSlots: 2,
  },
  {
    name: "medium rover",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/04/Medium_Rover.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["plastic", "plastic", "rubber"],
      },
    ],
    bytes: 3750,
    mediumSlots: 2,
    largeSlots: 1,
  },
  {
    name: "large rover",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/76/Large_Rover.png",
    needs: [
      {
        tool: "large printer",
        resources: ["exo chip", "exo chip", "aluminum alloy", "rubber"],
      },
    ],
    bytes: 5000,
    largeSlots: 4,
  },
];

export { ROVERS };

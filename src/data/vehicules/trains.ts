import type { Vehicule } from "../../types/objects.types";

const TRAINS: Vehicule[] = [
  {
    name: "rail engine",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/2c/Rail_Engine.png",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/83/Icon_Rail_Engine.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Rail_Engine",
    needs: [
      {
        tool: "medium printer",
        resources: ["resin", "aluminum", "copper"],
      },
    ],
    bytes: 1000,
    storageCapacity: {
        smallSlots: 2
    },
  },
  {
    name: "rail car",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/a9/Rail_Car.png",
    icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/83/Icon_Rail_Engine.png",
    wikiUrl: "https://astroneer.fandom.com/wiki/Rail_Car",
    needs: [
      {
        tool: "medium printer",
        resources: ["resing", "resin", "aluminum"],
      },
    ],
    bytes: 0,
    storageCapacity: {
        largeSlots: 1
    },
  },
];

export { TRAINS };


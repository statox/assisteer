import type { Vehicule } from "../../types/objects.types";

const OTHER_VEHICULES: Vehicule[] = [
  {
    name: "hoverboard",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/20/Hoverboard.png",
    needs: [
      {
        tool: "backpack",
        resources: ["exo chip"],
      },
    ],
    bytes: 0,
    storageCapacity: {},
  },
  {
    name: "vtol",
    type: "vehicule",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/54/VTOL.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["exo chip", "tungsten carbide", "silicone"],
      },
    ],
    bytes: 0,
    storageCapacity: {},
  },
];

export { OTHER_VEHICULES };

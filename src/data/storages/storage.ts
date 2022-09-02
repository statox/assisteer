import type { Storage } from "../../types/storages.types";

// https://astroneer.fandom.com/wiki/Storages
const STORAGES: Storage[] = [
  /*
   * Medium storages
   */
  {
    name: "medium storage",
    type: "storage",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/f4/Medium_Storage_Flat.jpg",
    needs: [{ tool: "small printer", resources: ["resin", "resin"] }],
    bytes: 0,
    tier: 2,
    storageCapacity: {
      smallSlots: 8,
    },
  },
  {
    name: "medium storage silo",
    type: "storage",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/aa/Medium_Storage_Silo.png",
    needs: [{ tool: "small printer", resources: ["titanium", "titanium"] }],
    bytes: 3000,
    tier: 2,
    storageCapacity: {
      smallSlots: 24,
    },
  },
  {
    name: "tall storage",
    type: "storage",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/b5/Tall_Storage.png",
    needs: [{ tool: "small printer", resources: ["ceramic"] }],
    bytes: 400,
    tier: 2,
    storageCapacity: {
      smallSlots: 3,
    },
  },
  /*
   * Large platforms
   */
  {
    name: "large storage",
    type: "storage",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/24/Large_Storage.png",
    needs: [
      { tool: "medium printer", resources: ["ceramic", "ceramic", "ceramic"] },
    ],
    bytes: 2000,
    tier: 3,
    storageCapacity: {
      mediumSlots: 4,
    },
  },
  {
    name: "large storage silo a",
    type: "storage",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/4d/Large_Storage_Silo_A.png",
    needs: [
      { tool: "medium printer", resources: ["aluminum", "aluminum", "steel"] },
    ],
    bytes: 5000,
    tier: 3,
    storageCapacity: {
      mediumSlots: 8,
    },
  },
  {
    name: "large storage silo b",
    type: "storage",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/2f/Large_Storage_Silo_B.png",
    needs: [{ tool: "medium printer", resources: ["steel", "steel", "steel"] }],
    bytes: 7500,
    tier: 3,
    storageCapacity: {
      mediumSlots: 12,
    },
  },
  {
    name: "large active storage",
    type: "storage",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/a8/Large_Active_Storage.png",
    needs: [
      { tool: "medium printer", resources: ["zinc", "aluminum", "resin"] },
    ],
    bytes: 2000,
    tier: 3,
    storageCapacity: {
      smallSlots: 15,
    },
  },
  {
    name: "extra large active storage",
    type: "storage",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/bb/Extra_Large_Storage.png",
    needs: [
      {
        tool: "large printer",
        resources: ["iron", "iron", "ceramic", "ceramic"],
      },
    ],
    bytes: 2000,
    tier: 3,
    storageCapacity: {
      smallSlots: 15,
    },
  },
];

export { STORAGES };

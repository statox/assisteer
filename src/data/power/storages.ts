import type { PowerStorage } from "../../types/objects.types";

const POWER_STORAGES: PowerStorage[] = [
  {
    name: "power cell",
    type: "power_storage",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d5/Power-cells.png",
    needs: [{ tool: "backpack", resources: ["graphite"] }],
    output: 1,
    capacity: 48,
    bytes: 800,
    tier: 1,
  },
  {
    name: "small battery",
    type: "power_storage",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/af/Small_Battery.jpg",
    needs: [{ tool: "backpack", resources: ["zinc"] }],
    output: 1,
    capacity: 32,
    bytes: 2000,
    tier: 1,
  },
  {
    name: "medium battery",
    type: "power_storage",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/11/Medium_Battery.jpg",
    needs: [{ tool: "small printer", resources: ["zinc", "lithium"] }],
    output: 5,
    capacity: 512,
    bytes: 3750,
    tier: 1,
  },
];

export { POWER_STORAGES };

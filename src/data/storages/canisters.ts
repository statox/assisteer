import type { Canister } from "../../types/storages.types";

// https://astroneer.fandom.com/wiki/Storages
const CANISTERS: Canister[] = [
  {
    name: "small canister",
    type: "canister",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/15/Small_Canister.png",
    needs: [{ tool: "small printer", resources: ["resin"] }],
    bytes: 0,
    tier: 1,
    resourceTypes: ["soil"],
    capacity: 1,
  },
  {
    name: "medium fluid & soil canister",
    type: "canister",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/4c/Medium_Fluid_%26_Soil_Canister.png",
    needs: [{ tool: "small printer", resources: ["plastic", "glass"] }],
    bytes: 2500,
    tier: 2,
    resourceTypes: ["soil", "hydrazine"],
    capacity: 24,
  },
  {
    name: "medium resource canister",
    type: "canister",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/f4/Medium_Resource_Canister.png",
    needs: [{ tool: "small printer", resources: ["plastic", "glass"] }],
    bytes: 2000,
    tier: 2,
    resourceTypes: ["natural", "refined", "composite"],
    capacity: 32,
  },
  {
    name: "medium gas canister",
    type: "canister",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/ff/Medium_Gas_Canister.png",
    needs: [{ tool: "small printer", resources: ["silicone", "glass"] }],
    bytes: 4000,
    tier: 2,
    resourceTypes: ["atmospheric"],
    capacity: 160,
  },
  {
    name: "large resource canister",
    type: "canister",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/12/Large_Resource_Canister.png",
    needs: [
      {
        tool: "medium printer",
        resources: ["glass", "titanium", "nanocarbon alloy"],
      },
    ],
    bytes: 5000,
    tier: 3,
    resourceTypes: ["natural", "refined", "composite"],
    capacity: 400,
  },
];

export { CANISTERS };

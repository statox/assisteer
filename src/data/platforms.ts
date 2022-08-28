import type { Platform } from "../types/objects.types";

// https://astroneer.fandom.com/wiki/Platforms
const PLATFORMS: Platform[] = [
  /*
   * Medium platforms
   */
  {
    name: "medium platform A",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/95/Platform_medium_a.png",
    needs: [{ tool: "small printer", resources: ["resin"] }],
    bytes: 0,
    powerConnectors: 4,
    mediumSlots: 1,
  },
  {
    name: "medium platform B",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d8/Platform_medium_b.png",
    needs: [{ tool: "small printer", resources: ["resin", "resin"] }],
    bytes: 250,
    powerConnectors: 4,
    smallSlots: 2,
    mediumSlots: 1,
  },
  {
    name: "medium platform C",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fe/Medium_Platform_C.png",
    needs: [{ tool: "small printer", resources: ["resin"] }],
    bytes: 400,
    powerConnectors: 3,
    smallSlots: 2,
    mediumSlots: 1,
  },
  {
    name: "tall platform",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/c/c2/Tall_Platform.png",
    needs: [{ tool: "small printer", resources: ["ceramic"] }],
    bytes: 750,
    powerConnectors: 3,
    smallSlots: 4,
    mediumSlots: 2,
  },
  {
    name: "medium T platform",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/5c/Medium_T-Platform.png",
    needs: [{ tool: "small printer", resources: ["resin", "resin"] }],
    bytes: 400,
    powerConnectors: 3,
    mediumSlots: 2,
  },
  /*
   * Large platforms
   */
  {
    name: "large platform A",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/57/Large_platform_a.png",
    needs: [{ tool: "small printer", resources: ["resin", "resin"] }],
    bytes: 0,
    powerConnectors: 4,
    largeSlots: 1,
  },
  {
    name: "large platform B",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/81/Large_platform.png",
    needs: [{ tool: "medium printer", resources: ["resin", "resin", "resin"] }],
    bytes: 500,
    powerConnectors: 4,
    mediumSlots: 2,
    largeSlots: 1,
  },
  {
    name: "large platform C",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/6/69/Large_platform_C.png",
    needs: [
      { tool: "medium printer", resources: ["resin", "iron", "ceramic"] },
    ],
    bytes: 1000,
    powerConnectors: 4,
    smallSlots: 20,
    largeSlots: 1,
  },
  {
    name: "large T platform",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/4f/Large_T-Platform.png",
    needs: [
      { tool: "medium printer", resources: ["aluminum", "aluminum", "resin"] },
    ],
    bytes: 1000,
    powerConnectors: 3,
    largeSlots: 2,
  },
  {
    name: "large curved platform",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/94/Large_Curved_Platform.jpg",
    needs: [
      { tool: "medium printer", resources: ["ceramic", "ceramic", "compound"] },
    ],
    bytes: 1000,
    powerConnectors: 4,
    largeSlots: 1,
  },
  {
    name: "large extended platform",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/dd/Large_Extended_Platform.png",
    needs: [{ tool: "medium printer", resources: ["resin", "resin"] }],
    bytes: 500,
    powerConnectors: 6,
    mediumSlots: 2,
  },
  /*
   * XL Platforms
   */
  {
    name: "extra large platform A",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/90/Extra_Large_Platform_A.png",
    needs: [
      {
        tool: "large printer",
        resources: ["iron", "iron", "ceramic", "ceramic"],
      },
    ],
    bytes: 2000,
    powerConnectors: 8,
    extraLargeSlots: 1,
  },
  {
    name: "extra large platform B",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/b2/Platform_d.png",
    needs: [
      {
        tool: "large printer",
        resources: ["iron", "iron", "iron", "iron"],
      },
    ],
    bytes: 3000,
    powerConnectors: 4,
    mediumSlots: 10,
  },
  {
    name: "extra large platform C",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/30/Extra_Large_Platform_C.png",
    needs: [
      {
        tool: "large printer",
        resources: ["iron", "iron", "resin", "resin"],
      },
    ],
    bytes: 2000,
    powerConnectors: 4,
    extraLargeSlots: 1,
    largeSlots: 2,
  },
  {
    name: "extra large curved platform",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/6/6a/Extra_Large_Curved_Platform.png",
    needs: [
      {
        tool: "large printer",
        resources: ["ceramic", "ceramic", "compound", "compound"],
      },
    ],
    bytes: 2000,
    powerConnectors: 4,
    largeSlots: 2,
    mediumSlots: 1,
  },
  {
    name: "figurine platform",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/12/Figurine_Platform.jpg",
    needs: [
      {
        tool: "large printer",
        resources: ["iron", "iron", "iron", "iron"],
      },
    ],
    bytes: 3000,
    powerConnectors: 4,
    smallSlots: 64,
  },
  {
    name: "extra large extended platform",
    type: "platform",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/5a/XL_Extended_Platform.png",
    needs: [
      {
        tool: "large printer",
        resources: ["resin", "resin", "resin"],
      },
    ],
    bytes: 750,
    powerConnectors: 4,
    largeSlots: 1,
    mediumSlots: 2,
  },
];

export { PLATFORMS };

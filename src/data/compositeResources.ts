import type { ResourceComposite } from "../types";

// TODO get the images locally instead of getting them from wikia
// https://astroneer.fandom.com/wiki/Category:Resource_icons
const COMPOSITE_RESOURCES: ResourceComposite[] = [
  {
    name: "rubber",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["organic", "resin"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/a5/Icon_Rubber.png",
  },
  {
    name: "plastic",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["carbon", "compound"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/c/c8/Icon_Plastic.png",
  },
  {
    name: "aluminum alloy",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["aluminum", "copper"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/30/Icon_Aluminum_Alloy.png",
  },
  {
    name: "tungsten carbide",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["tungsten", "carbon"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/06/Icon_Tungsten_Carbide.png",
  },
  {
    name: "graphene",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["graphite", "hydrazine"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/af/Icon_Graphene.png",
  },
  {
    name: "diamond",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["graphene", "graphene"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/af/Icon_Diamond.png",
  },
  {
    name: "hydrazine",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["ammonium", "ammonium", "hydrogen"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fb/Icon_Hydrazine.png",
  },
  {
    name: "silicone",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["resin", "quartz", "methane"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/11/Icon_Silicone.png",
  },
  {
    name: "explosive powder",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["carbon", "carbon", "sulfur"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/8f/Icon_Explosive_Powder.png",
  },
  {
    name: "steel",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["iron", "carbon", "argon"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/38/Icon_Steel.png",
  },
  {
    name: "titanium alloy",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["titanium", "graphene", "nitrogen"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/85/Icon_Titanium_Alloy.png",
  },
  {
    name: "nanocarbon alloy",
    type: "composite",
    needs: [
      {
        tool: "chemistry lab",
        resources: ["titanium alloy", "steel", "helium"],
      },
    ],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/0c/Icon_Nanocarbon_Alloy.png",
  },
];

export { COMPOSITE_RESOURCES };

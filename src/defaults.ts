import type {
  Resource,
  ResourceNatural,
  ResourceRefined,
  ResourceAtmospheric,
  ResourceComposite,
} from "./types/stores.types";

// TODO get the images locally instead of getting them from wikia
// https://astroneer.fandom.com/wiki/Category:Resource_icons
const NATURAL_RESOURCES: ResourceNatural[] = [
  {
    name: "soil",
    type: "natural",
    planets: "all",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/57/Icon_Soil.png",
  },
  {
    name: "organic",
    type: "natural",
    planets: "all",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/90/Icon_Organic.png",
  },
  {
    name: "compound",
    type: "natural",
    planets: "all",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/9a/Icon_Compound.png",
  },
  {
    name: "resin",
    type: "natural",
    planets: "all",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/e/e0/Icon_Resin.png",
  },
  {
    name: "clay",
    type: "natural",
    planets: "all",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/4e/Icon_Clay.png",
  },
  {
    name: "quartz",
    type: "natural",
    planets: "all",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fc/Icon_Quartz.png",
  },
  {
    name: "ammonium",
    type: "natural",
    planets: "all",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/30/Icon_Ammonium.png",
  },
  {
    name: "graphite",
    type: "natural",
    planets: "all",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/c/c1/Icon_Graphite.png",
  },
  {
    name: "laterite",
    type: "natural",
    planets: "all",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/05/Icon_Laterite.png",
  },
  {
    name: "astronium",
    type: "natural",
    planets: "all",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/3c/Icon_Astronium.png",
  },
  {
    name: "sphalerite",
    type: "natural",
    planets: ["sylva", "desolo"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/5d/Icon_Sphalerite.png",
  },
  {
    name: "wolframite",
    type: "natural",
    planets: ["desolo", "calidor"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/ae/Icon_Wolframite.png",
  },
  {
    name: "malachite",
    type: "natural",
    planets: ["sylva", "calidor"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/3b/Icon_Malachite.png",
  },
  {
    name: "lithium",
    type: "natural",
    planets: ["vesania", "novus"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/20/Icon_Lithium.png",
  },
  {
    name: "hematite",
    type: "natural",
    planets: ["glacio", "novus"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/75/Icon_Hematite.png",
  },
  {
    name: "titanite",
    type: "natural",
    planets: ["vesania", "glacio"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d8/Icon_Titanite.png",
  },
];

const REFINED_RESOURCES: ResourceRefined[] = [
  {
    name: "carbon",
    type: "refined",
    needs: ["organic"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d1/Icon_Carbon.png",
  },
  {
    name: "ceramic",
    type: "refined",
    needs: ["clay"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/03/Icon_Ceramic.png",
  },
  {
    name: "glass",
    type: "refined",
    needs: ["quartz"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/76/Icon_Glass.png",
  },
  {
    name: "aluminum",
    type: "refined",
    needs: ["laterite"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/ac/Icon_Aluminum.png",
  },
  {
    name: "zinc",
    type: "refined",
    needs: ["sphalerite"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/85/Icon_Zinc.png",
  },
  {
    name: "copper",
    type: "refined",
    needs: ["malachite"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/db/Icon_Copper.png",
  },
  {
    name: "tungsten",
    type: "refined",
    needs: ["wolframite"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/91/Icon_Tungsten.png",
  },
  {
    name: "iron",
    type: "refined",
    needs: ["hematite"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/71/Icon_Iron.png",
  },
  {
    name: "titanium",
    type: "refined",
    needs: ["titanite"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/2a/Icon_Titanium.png",
  },
];

const ATMOSPHERIC_RESOURCES: ResourceAtmospheric[] = [
  {
    name: "hydrogen",
    type: "atmospheric",
    planets: ["sylva", "calidor", "vesania", "novus"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/42/Icon_Hydrogen.png",
  },
  {
    name: "argon",
    type: "atmospheric",
    planets: ["vesania", "glacio"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/24/Icon_Argon.png",
  },
  {
    name: "methane",
    type: "atmospheric",
    planets: ["novus", "atrox"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/14/Icon_Methane.png",
  },
  {
    name: "nitrogen",
    type: "atmospheric",
    planets: ["sylva", "vesania", "atrox"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/e/e2/Icon_Nitrogen.png",
  },
  {
    name: "sulfur",
    type: "atmospheric",
    planets: ["calidor", "atrox"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/45/Icon_Sulfur.png",
  },
  {
    name: "helium",
    type: "atmospheric",
    planets: ["atrox"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/79/Icon_Helium.png",
  },
];

const COMPOSITE_RESOURCES: ResourceComposite[] = [
  {
    name: "rubber",
    type: "composite",
    needs: ["organic", "resin"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/a5/Icon_Rubber.png",
  },
  {
    name: "plastic",
    type: "composite",
    needs: ["carbon", "compound"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/c/c8/Icon_Plastic.png",
  },
  {
    name: "aluminum alloy",
    type: "composite",
    needs: ["aluminum", "copper"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/30/Icon_Aluminum_Alloy.png",
  },
  {
    name: "tungsten carbide",
    type: "composite",
    needs: ["tungsten", "carbon"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/06/Icon_Tungsten_Carbide.png",
  },
  {
    name: "graphene",
    type: "composite",
    needs: ["graphite", "hydrazine"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/af/Icon_Graphene.png",
  },
  {
    name: "diamond",
    type: "composite",
    needs: ["graphene", "graphene"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/a/af/Icon_Diamond.png",
  },
  {
    name: "hydrazine",
    type: "composite",
    needs: ["ammonium", "ammonium", "hydrogen"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fb/Icon_Hydrazine.png",
  },
  {
    name: "silicone",
    type: "composite",
    needs: ["resin", "quartz", "methane"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/11/Icon_Silicone.png",
  },
  {
    name: "explosive powder",
    type: "composite",
    needs: ["carbon", "carbon", "sulfur"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/8f/Icon_Explosive_Powder.png",
  },
  {
    name: "steel",
    type: "composite",
    needs: ["iron", "carbon", "argon"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/38/Icon_Steel.png",
  },
  {
    name: "titanium alloy",
    type: "composite",
    needs: ["titanium", "graphene", "nitrogen"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/8/85/Icon_Titanium_Alloy.png",
  },
  {
    name: "nanocarbon alloy",
    type: "composite",
    needs: ["titanium alloy", "steel", "helium"],
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/0c/Icon_Nanocarbon_Alloy.png",
  },
];

const TOOLS = [
  {
    name: "digging",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/f5/Drill_Mod_1.png",
  },
  {
    name: "chemistry lab",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d2/Chemistry_Lab.jpg",
  },
  {
    name: "smelting furnace",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/79/Smelting_Furnace.png",
  },
  {
    name: "atmospheric extractor",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/02/Apt_condensor.png",
  },
];

const RESOURCES: Resource[] = [
  ...NATURAL_RESOURCES,
  ...REFINED_RESOURCES,
  ...ATMOSPHERIC_RESOURCES,
  ...COMPOSITE_RESOURCES,
];
export { RESOURCES, TOOLS };

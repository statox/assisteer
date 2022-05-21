import type {
  Resource,
  ResourceNatural,
  ResourceRefined,
  ResourceAtmospheric,
  ResourceComposite,
} from "./types/stores.types";

const NATURAL_RESOURCES: ResourceNatural[] = [
  {
    name: "soil",
    type: "natural",
    planets: "all",
  },
  {
    name: "organic",
    type: "natural",
    planets: "all",
  },
  {
    name: "compound",
    type: "natural",
    planets: "all",
  },
  {
    name: "resin",
    type: "natural",
    planets: "all",
  },
  {
    name: "clay",
    type: "natural",
    planets: "all",
  },
  {
    name: "quartz",
    type: "natural",
    planets: "all",
  },
  {
    name: "ammonium",
    type: "natural",
    planets: "all",
  },
  {
    name: "graphite",
    type: "natural",
    planets: "all",
  },
  {
    name: "laterite",
    type: "natural",
    planets: "all",
  },
  {
    name: "astronium",
    type: "natural",
    planets: "all",
  },
  {
    name: "sphalerite",
    type: "natural",
    planets: ["sylva", "desolo"],
  },
  {
    name: "wolframite",
    type: "natural",
    planets: ["desolo", "calidor"],
  },
  {
    name: "malachite",
    type: "natural",
    planets: ["sylva", "calidor"],
  },
  {
    name: "lithium",
    type: "natural",
    planets: ["vesania", "novus"],
  },
  {
    name: "hematite",
    type: "natural",
    planets: ["glacio", "novus"],
  },
  {
    name: "titanite",
    type: "natural",
    planets: ["vesania", "glacio"],
  },
];

const REFINED_RESOURCES: ResourceRefined[] = [
  {
    name: "carbon",
    type: "refined",
    needs: ["organic"],
  },
  {
    name: "ceramic",
    type: "refined",
    needs: ["clay"],
  },
  {
    name: "glass",
    type: "refined",
    needs: ["quartz"],
  },
  {
    name: "aluminum",
    type: "refined",
    needs: ["laterite"],
  },
  {
    name: "zinc",
    type: "refined",
    needs: ["sphalerite"],
  },
  {
    name: "copper",
    type: "refined",
    needs: ["malachite"],
  },
  {
    name: "tungsten",
    type: "refined",
    needs: ["wolframite"],
  },
  {
    name: "iron",
    type: "refined",
    needs: ["hematite"],
  },
  {
    name: "titanium",
    type: "refined",
    needs: ["titanite"],
  },
];

const ATMOSPHERIC_RESOURCES: ResourceAtmospheric[] = [
  {
    name: "hydrogen",
    type: "atmospheric",
    planets: ["sylva", "calidor", "vesania", "novus"],
  },
  {
    name: "argon",
    type: "atmospheric",
    planets: ["vesania", "glacio"],
  },
  {
    name: "methane",
    type: "atmospheric",
    planets: ["novus", "atrox"],
  },
  {
    name: "nitrogen",
    type: "atmospheric",
    planets: ["sylva", "vesania", "atrox"],
  },
  {
    name: "sulfur",
    type: "atmospheric",
    planets: ["calidor", "atrox"],
  },
  {
    name: "helium",
    type: "atmospheric",
    planets: ["atrox"],
  },
];

const COMPOSITE_RESOURCES: ResourceComposite[] = [
  {
    name: "rubber",
    type: "composite",
    needs: ["organic", "resin"],
  },
  {
    name: "plastic",
    type: "composite",
    needs: ["carbon", "compound"],
  },
  {
    name: "aluminum alloy",
    type: "composite",
    needs: ["aluminum", "copper"],
  },
  {
    name: "tungsten carbide",
    type: "composite",
    needs: ["tungsten", "carbon"],
  },
  {
    name: "graphene",
    type: "composite",
    needs: ["graphite", "hydrazine"],
  },
  {
    name: "diamond",
    type: "composite",
    needs: ["graphene", "graphene"],
  },
  {
    name: "hydrazine",
    type: "composite",
    needs: ["ammonium", "ammonium", "hydrogen"],
  },
  {
    name: "silicone",
    type: "composite",
    needs: ["resin", "quartz", "methane"],
  },
  {
    name: "explosive powder",
    type: "composite",
    needs: ["carbon", "carbon", "sulfur"],
  },
  {
    name: "steel",
    type: "composite",
    needs: ["iron", "carbon", "argon"],
  },
  {
    name: "titanium alloy",
    type: "composite",
    needs: ["titanium", "graphene", "nitrogen"],
  },
  {
    name: "nanocarbon alloy",
    type: "composite",
    needs: ["titanium alloy", "steel", "helium"],
  },
];

const RESOURCES: Resource[] = [
  ...NATURAL_RESOURCES,
  ...REFINED_RESOURCES,
  ...ATMOSPHERIC_RESOURCES,
  ...COMPOSITE_RESOURCES,
];
export { RESOURCES };

type Tier = 1 | 2 | 3 | 4;

interface BaseThing {
  id: string;
  label: string;
  wikiUrl: string;
  icon: string;
  image: string;
}

interface ScrapRatio {
  numberOfScrap: number;
  numberProduced: number;
}

interface RawResource extends BaseThing {
  type: "raw";
  soilRequired: null | number;
  scrapRatio: null | ScrapRatio;
}

interface AtmosphericResource extends BaseThing {
  type: "atmospheric";
}

interface ComplexResource extends BaseThing, CraftableObject {
  type: "refined" | "composite";
}

type Resource = RawResource | AtmosphericResource | ComplexResource;

interface PowerConsumer {
  powerConsumption: number;
}

interface PowerProducer {
  powerOutput: number;
}

interface PowerStorage {
  powerCapacity: number;
}

interface ObjectStorage {
  slots: {
    tier: Tier;
    quantity: number;
  }[];
}

interface CraftableObject {
  craftedBy: Tool;
  CraftedWith: {
    resourceId: string;
    quantity: number;
  }[];
}

type ObjectCategory =
  | "augment"
  | "automation"
  | "battery"
  | "building"
  | "canister"
  | "logic"
  | "oxygen"
  | "platform"
  | "power source"
  | "storage"
  | "tool"
  | "trains"
  | "vehicule"
  | "vehicule attachments"
  | "widget";

interface Object extends BaseThing, CraftableObject {
  category: string;
  tier: Tier;
  bytesToResearch: number;
}

type Tool = Object &
  PowerConsumer & {
    produces: "object" | "resource";
  };
type Platform = Object & ObjectStorage;
type Vehicule = Object &
  PowerConsumer &
  PowerProducer &
  PowerStorage &
  ObjectStorage;
type PowerSource = Object & PowerProducer;
type Battery = Object & PowerProducer & PowerStorage;
type VehiculeAttachment = Object & PowerConsumer;
type Augment = Object & PowerConsumer;

export type { Tier };

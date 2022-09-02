import { ATMOSPHERIC_RESOURCES } from "./resources/atmosphericResources";
import { COMPOSITE_RESOURCES } from "./resources/compositeResources";
import { NATURAL_RESOURCES } from "./resources/naturalResources";
import { REFINED_RESOURCES } from "./resources/refinedResources";
import { ROVERS } from "./vehicules/rovers";
import { SHUTTLES } from "./vehicules/shuttles";
import { MODULES } from "./modules";
import { PLATFORMS } from "./platforms";
import { TOOLS } from "./tools";
import { WIDGETS } from "./widgets";
import { OTHER_VEHICULES } from "./vehicules/others";
import { AUGMENTS } from "./augments";
import { POWER_SOURCES } from "./power/producers";
import { POWER_STORAGES } from "./power/storages";
import { AUTOMATION_TOOLS } from "./automation";
import { STORAGES } from "./storages/storage";
import { CANISTERS } from "./storages/canisters";
import { SPECIAL_RESOURCES } from "./resources/specialResources";

const allObjects = {
  "natural resources": NATURAL_RESOURCES,
  "refined resources": REFINED_RESOURCES,
  "atmospheric resources": ATMOSPHERIC_RESOURCES,
  "composite resources": COMPOSITE_RESOURCES,
  "special resources": SPECIAL_RESOURCES,
  augments: AUGMENTS,
  widgets: WIDGETS,
  modules: MODULES,
  "automation tools": AUTOMATION_TOOLS,
  platforms: PLATFORMS,
  storages: STORAGES,
  canisters: CANISTERS,
  rovers: ROVERS,
  shuttles: SHUTTLES,
  "other vehicules": OTHER_VEHICULES,
  "power sources": POWER_SOURCES,
  "power storages": POWER_STORAGES,
};

export { TOOLS, allObjects };

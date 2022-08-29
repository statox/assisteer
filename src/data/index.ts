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

const allObjects = {
  "natural resources": NATURAL_RESOURCES,
  "refined resources": REFINED_RESOURCES,
  "atmospheric resources": ATMOSPHERIC_RESOURCES,
  "composite resources": COMPOSITE_RESOURCES,
  widgets: WIDGETS,
  modules: MODULES,
  platforms: PLATFORMS,
  rovers: ROVERS,
  shuttles: SHUTTLES,
};

export { TOOLS, allObjects };

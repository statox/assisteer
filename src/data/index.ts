import { ATMOSPHERIC_RESOURCES } from "./atmosphericResources";
import { COMPOSITE_RESOURCES } from "./compositeResources";
import { MODULES } from "./modules";
import { NATURAL_RESOURCES } from "./naturalResources";
import { PLATFORMS } from "./platforms";
import { REFINED_RESOURCES } from "./refinedResources";
import { ROVERS } from "./rovers";
import { SHUTTLES } from "./shuttles";
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

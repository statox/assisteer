import { ATMOSPHERIC_RESOURCES } from "./atmosphericResources";
import { COMPOSITE_RESOURCES } from "./compositeResources";
import { MODULES } from "./modules";
import { NATURAL_RESOURCES } from "./naturalResources";
import { REFINED_RESOURCES } from "./refinedResources";
import { TOOLS } from "./tools";
import { WIDGETS } from "./widgets";

const allObjects = {
  "natural resources": NATURAL_RESOURCES,
  "refined resources": REFINED_RESOURCES,
  "atmospheric resources": ATMOSPHERIC_RESOURCES,
  "composite resources": COMPOSITE_RESOURCES,
  widgets: WIDGETS,
  modules: MODULES,
};

export { TOOLS, allObjects };

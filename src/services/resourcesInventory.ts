import { RESOURCES } from "../defaults";

const getResourcesByType = () => {
  return RESOURCES.reduce((inventory, resource) => {
    if (!inventory[resource.type]) {
      inventory[resource.type] = [];
    }
    inventory[resource.type].push(resource);
    return inventory;
  }, {});
};

export { getResourcesByType };

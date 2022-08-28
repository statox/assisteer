import { allObjects } from "../data";

const allObjectsList = [...Object.keys(allObjects)].reduce((all, key) => {
  all.push(...allObjects[key]);
  return all;
}, []);

const allCategories = Object.keys(allObjects);

const searchInAllObjects = (name: string) => {
  return allObjectsList.find((i) => i.name === name);
};

const searchInCategory = (category: string, name: string) => {
  return allObjects[category].find((r) => r.name === name);
};

const getCategoryObjects = (category: string) => {
  return allObjects[category];
};

export {
  allCategories,
  getCategoryObjects,
  searchInAllObjects,
  searchInCategory,
};
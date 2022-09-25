import { getObject } from "./data/objects";
import { getObjectDefaultRecipe, getRecipeDependenciesTree } from "./data/recipes";

export type Project = {
    [objectName: string]: number;
};

export type ResourceList = {
    [category: string]: {
        [resourceName: string]: number;
    };
};

const getProjectResourcesList = (project: Project): ResourceList => {
    const list = {};

    const stack = [];
    for (const objectName of Object.keys(project)) {
        const quantity = project[objectName];
        const recipe = getObjectDefaultRecipe(objectName);
        const depTree = getRecipeDependenciesTree(recipe, quantity);

        stack.push(depTree.resources);
    }

    while (stack.length) {
        const deps = stack.shift();
        for (const resourceName of Object.keys(deps)) {
            const object = getObject(resourceName);
            const category = object.category;
            const quantity = deps[resourceName].quantity;
            const objectDeps = deps[resourceName].resources;

            if (!list[category]) {
                list[category] = {};
            }
            if (!list[category][resourceName]) {
                list[category][resourceName] = quantity;
            } else {
                list[category][resourceName] += quantity;
            }

            if (objectDeps) {
                stack.push(objectDeps);
            }
        }
    }
    console.log(list);
    return list;
}

export { getProjectResourcesList };

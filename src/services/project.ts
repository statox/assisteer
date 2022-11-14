import sampleProjects from '../data/assisteer/defaultProjects.json';
import { defaultProject } from '../stores';
import { BaseObject, getObject, getObjectUnlockCost } from './data/objects';
import { getAllRecipesList, getObjectDefaultRecipe, getRecipeDependenciesTree } from './data/recipes';

export type Project = {
    name: string;
    objects: {
        [objectName: string]: {
            quantity: number;
        }
    };
};

export type SavedProject = {
    planet: string;
    objects: {
        [objectId: string]: {
            quantity: number;
        };
    };
    name: string;
};

export type ResourceList = {
    [category: string]: {
        [resourceName: string]: number;
    };
};

interface FlatTree {
    nodes: {
        id: string;
        object: BaseObject;
        quantity: number;
    }[];
    edges: {
        source: string;
        target: string;
    }[];
}
const projectToFlatTree = (project: Project, params?: { includeObjectTool: boolean }): FlatTree => {
    const { includeObjectTool } = params || {};
    const nodes = {};
    const edges = {};

    for (const objectName of Object.keys(project.objects)) {
        const object = getObject(objectName);
        const recipe = getObjectDefaultRecipe(objectName);
        const quantity = project.objects[objectName].quantity;
        const rootDepTree = getRecipeDependenciesTree(recipe, quantity);

        nodes[objectName] = {
            object,
            quantity
        };

        if (!rootDepTree.resources) {
            return;
        }

        if (includeObjectTool) {
            const toolName = recipe.tool;
            const tool = getObject(toolName);
            nodes[toolName] = {
                object: tool,
                quantity: 0
            };
            rootDepTree.object = tool;

            if (!edges[toolName]) {
                edges[toolName] = new Set([objectName]);
            } else {
                edges[toolName].add(objectName);
            }
        }

        const stack = [rootDepTree];
        while (stack.length && stack.length < 30) {
            const depTree = stack.shift();

            for (const depName of Object.keys(depTree.resources)) {
                if (!nodes[depName]) {
                    nodes[depName] = {
                        object: getObject(depName),
                        quantity: depTree.resources[depName].quantity
                    };
                } else {
                    nodes[depName].quantity += depTree.resources[depName].quantity;
                }

                if (depTree.resources[depName].resources) {
                    stack.push(depTree.resources[depName]);
                }

                if (!edges[depName]) {
                    edges[depName] = new Set([depTree.object.id]);
                } else {
                    edges[depName].add(depTree.object.id);
                }
            }
        }
    }

    const flatNodes = Object.keys(nodes).map((nodeName) => {
        return {
            ...nodes[nodeName],
            id: nodeName
        };
    });

    const flatEdges = Object.keys(edges).reduce((flatEdges, target) => {
        const sources = edges[target];
        for (const source of sources) {
            flatEdges.push({ source, target });
        }
        return flatEdges;
    }, []);
    return { nodes: flatNodes, edges: flatEdges };
};

type ProjectLightResource = {
    objectName: string;
    quantity: number;
};

type ProjectLightResourcesByCategory = {
    [category: string]: ProjectLightResource[];
};

const getProjectResourcesByCategories = (project: Project): ProjectLightResourcesByCategory => {
    const list = {};
    const tree = projectToFlatTree(project);
    for (const node of tree.nodes) {
        const { object, quantity } = node;
        const type = object.type;
        if (type !== 'resource') {
            continue;
        }
        const category = object.category;

        if (!list[category]) {
            list[category] = {};
        }
        if (!list[category][object.id]) {
            list[category][object.id] = quantity;
        } else {
            list[category][object.id] += quantity;
        }
    }
    return list;
};

type ProjectObject = {
    objectName: string;
    object: BaseObject;
    quantity: number;
};

type ProjectObjectsByCategory = {
    [category: string]: ProjectObject[];
};

const getProjectObjectsByCategory = (project: Project): ProjectObjectsByCategory => {
    const objectsByCategory: ProjectObjectsByCategory = {};

    for (const objectName of Object.keys(project.objects)) {
        const object = getObject(objectName);
        const quantity = project.objects[objectName].quantity;
        const category = object.category;

        if (!objectsByCategory[category]) {
            objectsByCategory[category] = [];
        }
        objectsByCategory[category].push({ objectName, object, quantity });
    }

    return objectsByCategory;
};

const getProjectObjectsByTier = (project: Project): ProjectObjectsByCategory => {
    const objectsByTier: ProjectObjectsByCategory = {};

    for (const objectName of Object.keys(project.objects)) {
        const object = getObject(objectName);
        const quantity = project.objects[objectName].quantity;
        const tier = 'tier ' + object.tier;

        if (!objectsByTier[tier]) {
            objectsByTier[tier] = [];
        }
        objectsByTier[tier].push({ objectName, object, quantity });
    }

    return objectsByTier;
};

const getProjectTotalUnlockCost = (project: Project) => {
    let projectTotalUnlockCost = 0;
    for (const objectName of Object.keys(project.objects)) {
        projectTotalUnlockCost += getObjectUnlockCost(objectName);
    }
    return projectTotalUnlockCost;
};

export type ChangeQuantityFnParams = {
    op: 'inc' | 'dec' | 'remove' | 'add';
    objectId: string;
} | {
    op: 'reset';
} | {
    op: 'set';
    objectId: string;
    quantity: number;
};
const updateObjectQuantityInProject = (
    project: Project,
    params: ChangeQuantityFnParams
) => {
    const { op } = params;

    if (op === 'reset') {
        project = defaultProject;
    }
    if (op === 'set') {
        const { quantity, objectId } = params;
        if (Number.isNaN(quantity) || quantity <= 0) {
            return;
        }
        if (!project.objects[objectId]) {
            project.objects[objectId] = { quantity: 0 };
        }
        project.objects[objectId].quantity = quantity;
    }
    if (op === 'inc') {
        const { objectId } = params;
        if (!project.objects[objectId]) {
            project.objects[objectId] = { quantity: 0 };
        }
        project.objects[objectId].quantity += 1;
    }
    if (op === 'dec') {
        const { objectId } = params;
        if (!project.objects[objectId]) {
            return;
        }
        project.objects[objectId].quantity -= 1;
        if (project.objects[objectId].quantity <= 0) {
            delete project.objects[objectId];
        }
    }
    if (op === 'remove') {
        const { objectId } = params;
        delete project.objects[objectId];
    }
    if (op === 'add') {
        const { objectId } = params;
        if (!project.objects[objectId]) {
            project.objects[objectId] = { quantity: 0 };
        }
        project.objects[objectId].quantity += 1;
    }
    return project;
};

const getDefaultProjectsList = (): SavedProject[] => {
    const allRecipes = getAllRecipesList();
    const allObjectsProject = {
        name: 'All objects',
        planet: 'sylva',
        objects: Object.keys(allRecipes).reduce((all, objectName) => {
            const object = getObject(objectName);
            if (object.type === 'object') {
                all[objectName] = 1;
            }
            return all;
        }, {})
    };

    return [...sampleProjects, allObjectsProject];
};

export {
    getDefaultProjectsList,
    getProjectObjectsByCategory,
    getProjectObjectsByTier,
    getProjectResourcesByCategories,
    getProjectTotalUnlockCost,
    projectToFlatTree,
    ProjectLightResourcesByCategory,
    ProjectObjectsByCategory,
    ProjectObject,
    updateObjectQuantityInProject
};

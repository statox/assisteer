import { BaseObject, getObject, getObjectUnlockCost } from "./data/objects";
import { getObjectDefaultRecipe, getRecipeDependenciesTree } from "./data/recipes";

export type Project = {
    [objectName: string]: number;
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
    }[],
    edges: {
        source: string;
        target: string;
    }[]
}
const projectToFlatTree = (project: Project): FlatTree => {
    const nodes = {};
    const edges = {};

    for (const objectName of Object.keys(project)) {
        const object = getObject(objectName);
        const recipe = getObjectDefaultRecipe(objectName);
        const quantity = project[objectName];
        const rootDepTree = getRecipeDependenciesTree(recipe, quantity);

        nodes[objectName] = {
            object,
            quantity
        }

        if (!rootDepTree.resources) {
            return;
        }

        for (const depName of Object.keys(rootDepTree.resources)) {
            if (!edges[depName]) {
                edges[depName] = new Set([objectName]);
            } else {
                edges[depName].add(objectName);
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
                    }
                } else {
                    nodes[depName].quantity += depTree.resources[depName].quantity
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

    const flatNodes = Object.keys(nodes).map(nodeName => {
        return {
            ...nodes[nodeName],
            id: nodeName
        }
    });

    const flatEdges = Object.keys(edges).reduce((flatEdges, target) => {
        const sources = edges[target];
        for (const source of sources) {
            flatEdges.push({ source, target });
        }
        return flatEdges
    }, []);
    return { nodes: flatNodes, edges: flatEdges };
};

const getProjectResourcesList = (project: Project): ResourceList => {
    const list = {};

    const tree = projectToFlatTree(project);
    for (const node of tree.nodes) {
        const { object, quantity } = node;
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
}

const getProjectItemsByResourceCategoriesAndTiers = (project: Project): ResourceList => {
    const list = {};
    const tree = projectToFlatTree(project);
    for (const node of tree.nodes) {
        const { object, quantity } = node;
        const type = object.type;
        const category = object.category;
        const tier = object.tier;

        const categoryToUse = type === 'resource' ? category : "tier " + tier;

        if (!list[categoryToUse]) {
            list[categoryToUse] = {};
        }
        if (!list[categoryToUse][object.id]) {
            list[categoryToUse][object.id] = quantity;
        } else {
            list[categoryToUse][object.id] += quantity;
        }
    }
    return list;
}

const getProjectTotalUnlockCost = (project: Project) => {
    let projectTotalUnlockCost = 0;
    for (const objectName of Object.keys(project)) {
        projectTotalUnlockCost += getObjectUnlockCost(objectName);
    }
    return projectTotalUnlockCost;
}

export { getProjectItemsByResourceCategoriesAndTiers, getProjectResourcesList, getProjectTotalUnlockCost, projectToFlatTree };

import recipes from '../../data/recipes.json';
import rawResource from '../../data/rawResources.json';
import { BaseObject, getObject } from './objects';

const getAllRecipesList = () => {
    return recipes;
};

export type Recipe = {
    product: string;
    tool: string;
    resources: {
        [resourceName: string]: number;
    };
}

const getObjectRecipes = (objectName: string): Recipe[] => {
    if (!recipes[objectName]) {
        return [];
    }
    return recipes[objectName];
};

const getObjectDefaultRecipe = (objectName: string): Recipe => {
    if (!recipes[objectName]) {
        return;
    }
    return recipes[objectName][0];
};

type DepLevel<T> = {
    object: BaseObject;
    quantity: number;
    type: 'not_raw' | 'raw';
    tool?: string;
    resources?: {
        [objectName: string]: T;
    }
};

export interface DepTree extends DepLevel<DepTree> { } // eslint-disable-line @typescript-eslint/no-empty-interface

const getRecipeDependenciesTree = (recipe: Recipe, finalObjectQuantity: number): DepTree => {
    const result = {
        object: getObject(recipe.product),
        tool: recipe.tool,
        quantity: finalObjectQuantity,
        type: 'not_raw',
        resources: {}
    } as DepTree;

    for (const resource of Object.keys(recipe.resources)) {
        const quantity = recipe.resources[resource];
        if (rawResource[resource]) {
            result.resources[resource] = {
                object: getObject(resource),
                quantity: quantity * finalObjectQuantity,
                type: 'raw'
            };
        } else {
            const subRecipe = getObjectDefaultRecipe(resource);
            result.resources[resource] = {
                object: getObject(resource),
                type: 'not_raw',
                quantity: quantity * finalObjectQuantity,
                ...getRecipeDependenciesTree(subRecipe, quantity * finalObjectQuantity)
            };
        }
    }

    return result;
};

export { getAllRecipesList, getObjectDefaultRecipe, getObjectRecipes, getRecipeDependenciesTree };

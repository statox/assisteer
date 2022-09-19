import * as recipes from '../../data2/recipes.json'
import * as rawResource from '../../data2/rawResources.json';

const getAllRecipesList = () => {
return recipes;
}

type Recipe = {
    tool: string;
    resources: {
        [resourceName: string]: number;
    };
}

const getObjectRecipes = (objectName: string): Recipe[] => {
    if (!recipes[objectName]) {
        throw new Error(`Recipe not found for ${objectName}`);
    }
    return recipes[objectName];
}

const getObjectDefaultRecipe = (objectName: string): Recipe => {
    if (!recipes[objectName]) {
        throw new Error(`Recipe not found for ${objectName}`);
    }
    return recipes[objectName][0];
}

type DepLevel<T> = {
    quantity: number;
    type: 'not_raw' | 'raw';
    tool?: string;
    resources?: {
        [objectName: string]: T;
    }
};
interface DepTree extends DepLevel<DepTree> { };

const getRecipeDependenciesTree = (recipe: Recipe, finalObjectQuantity: number): DepTree => {
    const result = {
        tool: recipe.tool,
        quantity: finalObjectQuantity,
        type: 'not_raw',
        resources:{}
    } as DepTree;

    for (const resource of Object.keys(recipe.resources)) {
        const quantity = recipe.resources[resource];
        if (rawResource[resource]) {
            result.resources[resource] = {
                quantity: quantity * finalObjectQuantity,
                type: 'raw'
            }
        } else {
            const subRecipe = getObjectDefaultRecipe(resource);
            result.resources[resource] = {
                type: 'not_raw',
                quantity: quantity * finalObjectQuantity,
                ...getRecipeDependenciesTree(subRecipe, quantity*finalObjectQuantity)
            }
        }
    }

    return result;
}

export { getAllRecipesList, getObjectRecipes, getRecipeDependenciesTree };

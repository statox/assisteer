import { getAllObjectsNames, getObject } from "../services/data/objects";
import { getObjectDefaultRecipe, getRecipeDependenciesTree } from "../services/data/recipes";

// const object = 'plastic';
// const recipe = getObjectRecipes(object)[0];
// console.log(`Got ${object} recipe:`);
// console.log({recipe});
//
// const deps = getRecipeDependenciesTree(recipe, 3);
//
// console.log('Final result');
// console.log(JSON.stringify(deps, null, 2));

const objects = ['organic', 'buggy'];

for (const objectName of objects) {
    const object = getObject(objectName);
    console.log(object);
    try {
        const recipe = getObjectDefaultRecipe(objectName);
        const deps = getRecipeDependenciesTree(recipe, 1);

        console.log(recipe);
        console.log(JSON.stringify(deps, null, 2));
    } catch (e) {
        console.log('no recipe');
    }
}


console.log(getAllObjectsNames());

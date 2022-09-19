import * as recipes from '../data2/recipes.json';
import * as fs from 'fs';
import { allObjects } from "../data";


function createNewRecipesFile() {
    const recipes = Object.values(allObjects).flat().map(o => {
        const {name, needs } = o;
        return {name, needs};
    })

    const newRecipes = {};

    for (const object of recipes) {
        if (['atmospheric extractor', 'digging'].includes(object.needs[0].tool)) {
            continue;
        }
        console.log(object.name);
        if (!newRecipes[object.name]) {
            newRecipes[object.name] = [];
        }
        for (const recipe of object.needs) {
            const resources = {};
            for (const resource of recipe.resources) {
                if (!resources[resource]) {
                    resources[resource] = 1;
                } else {
                    resources[resource] += 1;
                }
            }
            newRecipes[object.name].push({
                tool: recipe.tool,
                resources
            });
            console.log(newRecipes[object.name]);
        }
    }

    console.log('writting object to file');
    fs.writeFileSync('./src/data2/recipes.json', JSON.stringify(newRecipes, null, 2) , 'utf-8');
}

function createResourcesFile() {

    const rawResources = Object.values(allObjects).flat().filter(o => {
        return !['soil', 'exo chip', 'scap'].includes(o.name) && ['natural', 'atmospheric'].includes(o.type);
    }).map(r => {
        delete r.needs;
        return r;
    }).sort((r1, r2) => {
        if (r1.type !== r2.type) {
            return r1.type === 'natural' ? -1 : 1;
        }
        return r1.name < r2.name ? -1 : 1;
    }).reduce((rawResources, resource) => {
        const name = resource.name;
        delete resource.name;
        rawResources[name] = resource;
        return rawResources;
    }, {});
    console.log(rawResources);

    console.log('writting object to file');
    fs.writeFileSync('./src/data2/rawResources.json', JSON.stringify(rawResources, null, 2) , 'utf-8');
}

function orderRecipes() {
    const orderedRecipesName = Object.keys(recipes).sort((a, b) => a<b ? -1 : 1);
    console.log(orderedRecipesName);
    const orderedRecipes = {};
    for (const recipeName of orderedRecipesName) {
        const recipe = recipes[recipeName];
        orderedRecipes[recipeName] = recipe;
    }
    console.log(JSON.stringify(orderedRecipes, null, 2));
    fs.writeFileSync('./src/data2/recipes.json', JSON.stringify(orderedRecipes, null, 2) , 'utf-8');
}
orderRecipes();

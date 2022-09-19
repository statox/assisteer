import * as newInventory from '../data2/objects.json';
import * as recipes from '../data2/recipes.json';
import * as fs from 'fs';
import { allObjects } from "../data";
import { searchInAllObjects } from '../services/resources';


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

function findMissingData() {
    const completeObjectNameList = Object.keys(recipes).sort((a, b) => a<b?-1:1);
    const completeObjectInventory = {};
    const types = new Set();
    for (const objectName of completeObjectNameList) {
        let object = searchInAllObjects(objectName);
        if (!object) {
            object = {};
        }
        delete object.needs
        if (object.type) {
            object.category = object.type;
            if (['refined', 'composite', 'special_resource'].includes(object.type)) {
                object.type = 'resource';
            } else {
                object.type = 'object';
            }
            types.add(object.type);
        }
        object.labels = {
            'en': object.name
        }
        delete object.name;
        if (object.bytesToUnlock) {
            object.bytes = object.bytesToUnlock;
            delete object.bytesToUnlock;
        }

        const transformedName = objectName.split(' ')
                                .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                                .join('_');
        const probableWikiUrl = `https://astroneer.fandom.com/wiki/${transformedName}`;
        completeObjectInventory[objectName] = {
            type: object.type || '',
            category: object.category || '',
            url: {
                icon: object.icon || '',
                image: object.icon2 || '',
                wiki: object.wikiUrl || probableWikiUrl,
            },
            labels: object.labels,
        };
    }
    fs.writeFileSync('./src/data2/objects.json', JSON.stringify(completeObjectInventory, null, 2) , 'utf-8');
    console.log(...types.values());
}

function fixIconImageUrl() {
    for(const objectName of Object.keys(newInventory)) {
        const object = newInventory[objectName];
        const {icon, image} = object.url || {image: '', icon: ''};
        const re = /Icon_/;

        if (!object.url) {
            object.url = {image: '', icon: ''};
        }

        if (!object.url.icon.match(re) && image.match(re)) {
            object.url.image = icon;
            object.url.icon = image;
        }
        if ((object.url.image.length === 0 || object.url.image.match(re)) && !icon.match(re)) {
            object.url.image = icon;
            object.url.icon = image;
        }
    }

    fs.writeFileSync('./src/data2/objects2.json', JSON.stringify(newInventory, null, 2) , 'utf-8');
}

fixIconImageUrl();

import { BaseObject, getObject } from './data/objects';
import { getAllRecipesList } from './data/recipes';
import { Project, projectToFlatTree } from './project';

export type ResourceUsages = {
    refined?: BaseObject[];
    composite?: BaseObject[];
    tier_1?: BaseObject[];
    tier_2?: BaseObject[];
    tier_3?: BaseObject[];
    tier_4?: BaseObject[];
};

type AllResourcesUsages = {
    [resourceId: string]: ResourceUsages;
};
const computeAllResourcesUsages = (): AllResourcesUsages => {
    const allRecipes = getAllRecipesList();
    const allDependencies = {};

    for (const objectId of Object.keys(allRecipes)) {
        const producedObject = getObject(objectId);
        const fakeProject: Project = { name: 'tmp', objects: {} };
        fakeProject.objects[objectId] = 1;
        const flatTree = projectToFlatTree(fakeProject);

        let category: string;
        if (producedObject.type === 'resource') {
            category = producedObject.category;
        } else {
            category = 'tier_' + producedObject.tier;
        }

        for (const resourceNode of flatTree.nodes) {
            const resourceId = resourceNode.object.id;
            if (resourceNode.object.type !== 'resource') {
                continue;
            }

            if (!allDependencies[resourceId]) {
                allDependencies[resourceId] = {};
            }
            if (!allDependencies[resourceId][category]) {
                allDependencies[resourceId][category] = [];
            }
            allDependencies[resourceId][category].push(getObject(objectId));
        }
    }

    return allDependencies;
};

const allResourcesUsages = computeAllResourcesUsages();

const getResourceUsages = (resourceId: string): ResourceUsages => {
    return allResourcesUsages[resourceId];
};

export { getResourceUsages };

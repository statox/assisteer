import rawResources from '../../data2/rawResources.json';
import inventory from '../../data2/objects.json';
import researchDetails from '../../data2/researchDetails.json';

type ObjectCategory =
    "natural" | "atmospheric" | "composite" | "refined"
    | "augment"
    | "automation"
    | "battery"
    | "building"
    | "canister"
    | "logic"
    | "oxygen"
    | "platform"
    | "power source"
    | "storage"
    | "tool"
    | "trains"
    | "vehicule"
    | "vehicule attachments"
    | "widget";

export type BaseObject = {
    id: string;
    type: "object" | "resource";
    category: ObjectCategory;
    tier: number;
    bytesRequired: number;
    url: {
        icon: string;
        image: string;
        wiki: string;
    }
    labels: {
        [lang: string]: string
    }
};

const objectNames = Object.keys(inventory);
const resourceNames = Object.keys(rawResources);
const allNames = objectNames.concat(resourceNames).sort((a, b) => a < b ? -1 : 1);

const getObjectUnlockCost = (objectName: string) => {
    return researchDetails[objectName]?.bytesRequired || 0;
}

const getObject = (objectName: string): BaseObject => {
    const bytesRequired = getObjectUnlockCost(objectName);
    if (inventory[objectName]) {
        return {
            ...inventory[objectName],
            bytesRequired
        };
    }

    if (rawResources[objectName]) {
        return {
            ...rawResources[objectName],
            bytesRequired
        };
    }

    throw new Error(`Object not found ${objectName}`);
}

const getAllObjectsNames = () => allNames;

export { getAllObjectsNames, getObject, getObjectUnlockCost };

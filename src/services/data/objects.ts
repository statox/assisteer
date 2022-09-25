import rawResources from '../../data2/rawResources.json';
import inventory from '../../data2/objects.json';

type ObjectCategory =
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

const getObject = (objectName: string): BaseObject => {
    if (inventory[objectName]) {
        return inventory[objectName];
    }

    if (rawResources[objectName]) {
        return rawResources[objectName];
    }

    throw new Error(`Object not found ${objectName}`);
}

const getAllObjectsNames = () => allNames;

export { getAllObjectsNames, getObject };

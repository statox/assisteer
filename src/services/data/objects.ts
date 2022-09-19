import * as inventory from '../../data2/objects.json';

const getObject = (objectName: string) => {
    if (!inventory[objectName]) {
        throw new Error(`Object not found ${objectName}`);
    }
    return inventory[objectName];
}

export { getObject };

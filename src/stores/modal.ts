import { writable } from 'svelte/store';
import type { BaseObject } from '../services/data/objects';

const objectSelectionModalShow = writable<boolean>(false);
const objectSelectionModalObject = writable<BaseObject>(null);

const modalObjectHistory: BaseObject[] = [];
let modalObjectHistoryIndex = 0;

const updateModalObject = (object: BaseObject) => {
    if (modalObjectHistory.length > 0 && modalObjectHistory[modalObjectHistory.length - 1].id === object.id) {
        return;
    }

    modalObjectHistory.splice(modalObjectHistoryIndex + 1);
    modalObjectHistory.push(object);
    modalObjectHistoryIndex = modalObjectHistory.length - 1;

    objectSelectionModalObject.set(object);
};

const prevModalObject = () => {
    if (modalObjectHistoryIndex <= 0) {
        return;
    }

    modalObjectHistoryIndex--;
    objectSelectionModalObject.set(modalObjectHistory[modalObjectHistoryIndex]);
};

const nextModalObject = () => {
    if (modalObjectHistory.length === 0 || modalObjectHistoryIndex >= modalObjectHistory.length - 1) {
        return;
    }
    modalObjectHistoryIndex++;
    objectSelectionModalObject.set(modalObjectHistory[modalObjectHistoryIndex]);
};

export { objectSelectionModalShow, objectSelectionModalObject, nextModalObject, prevModalObject, updateModalObject };

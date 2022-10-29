import { writable } from 'svelte/store';
import type { BaseObject } from '../services/data/objects';

const modalShown = writable<boolean>(false);
const modalObject = writable<BaseObject>(null);

const modalObjectHistory: BaseObject[] = [];
let modalObjectHistoryIndex = 0;

const updateModalObject = (object: BaseObject) => {
    if (modalObjectHistory.length > 0 && modalObjectHistory[modalObjectHistory.length - 1].id === object.id) {
        return;
    }

    modalObjectHistory.splice(modalObjectHistoryIndex + 1);
    modalObjectHistory.push(object);
    modalObjectHistoryIndex = modalObjectHistory.length - 1;

    modalObject.set(object);
};

const prevModalObject = () => {
    if (modalObjectHistoryIndex <= 0) {
        return;
    }

    modalObjectHistoryIndex--;
    modalObject.set(modalObjectHistory[modalObjectHistoryIndex]);
};

const nextModalObject = () => {
    if (modalObjectHistory.length === 0 || modalObjectHistoryIndex >= modalObjectHistory.length - 1) {
        return;
    }
    modalObjectHistoryIndex++;
    modalObject.set(modalObjectHistory[modalObjectHistoryIndex]);
};

export { modalShown, modalObject, nextModalObject, prevModalObject, updateModalObject };

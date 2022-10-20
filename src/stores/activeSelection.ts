import { Writable, writable } from 'svelte/store';
import type { BaseObject } from '../services/data/objects';

type ActiveSelection = {
    object: BaseObject;
}

const defaultActiveSelection: ActiveSelection = {
    object: null
};

const storedActiveSelectionStr = localStorage.getItem('activeSelection');

let activeSelection: Writable<ActiveSelection>;
if (storedActiveSelectionStr) {
    try {
        activeSelection = writable<ActiveSelection>(JSON.parse(storedActiveSelectionStr) as ActiveSelection);
    } catch (e) {
        console.error('Couldnt load active selection from local storage');
        activeSelection = writable<ActiveSelection>(defaultActiveSelection);
    }
} else {
    activeSelection = writable<ActiveSelection>(defaultActiveSelection);
}

activeSelection.subscribe((value) => {
    localStorage.setItem('activeSelection', JSON.stringify(value));
});

export { activeSelection as selection };

import { writable } from 'svelte/store';

type Settings = {
    pictureType: 'image' | 'icon';
    treeSplitByObject: boolean;
};

const defaultSettings: Settings = {
    pictureType: 'icon',
    treeSplitByObject: true
};

const settings = writable<Settings>(defaultSettings);

export { settings };

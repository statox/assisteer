import { writable } from 'svelte/store';

type Settings = {
    pictureType: 'image' | 'icon';
    treeSplitByObject: boolean;
    showObjectTool: boolean;
};

const defaultSettings: Settings = {
    pictureType: 'icon',
    treeSplitByObject: true,
    showObjectTool: false
};

const settings = writable<Settings>(defaultSettings);

export { settings };

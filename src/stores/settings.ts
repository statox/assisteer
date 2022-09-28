import { writable } from "svelte/store";

type Settings = {
    pictureType: "image" | "icon";
}

const defaultSettings: Settings = {
    pictureType: "image"
}

const settings = writable<Settings>(defaultSettings);

export { settings };

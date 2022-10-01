import { writable } from "svelte/store";

type Settings = {
    pictureType: "image" | "icon";
}

const defaultSettings: Settings = {
    pictureType: "icon"
}

const settings = writable<Settings>(defaultSettings);

export { settings };

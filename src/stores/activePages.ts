import { Writable, writable } from "svelte/store";

type ActivePages = {
    planner: string;
    astropedia: string;
}

const defaultActivePages = {
    planner: "inventory",
    astropedia: "research"
}

const storedActivePagesStr = localStorage.getItem("activeSection");

let activePages: Writable<ActivePages>;
if (storedActivePagesStr) {
    try {
        activePages = writable<ActivePages>(JSON.parse(storedActivePagesStr) as ActivePages);
    } catch (e) {
        console.error('Couldnt load active sections from local storage');
        activePages = writable<ActivePages>(defaultActivePages);
    }
} else {
    activePages = writable<ActivePages>(defaultActivePages);
}

activePages.subscribe((value) => {
    localStorage.setItem("activeSection", JSON.stringify(value));
})

export { activePages };

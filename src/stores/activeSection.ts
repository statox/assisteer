import { Writable, writable } from "svelte/store";

const storedActiveSection = localStorage.getItem("activeSection");

let activeSection: Writable<string>;

if (storedActiveSection) {
    activeSection = writable<string>(storedActiveSection);
} else {
    activeSection = writable<string>("inventory");
}

activeSection.subscribe((value) => {
    localStorage.setItem("activeSection", value);
})

export { activeSection };

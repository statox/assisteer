import { writable, readable } from "svelte/store";
import { RESOURCES } from "./defaults";

const resources = readable(RESOURCES);

export { resources };

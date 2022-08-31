import { writable } from "svelte/store";
import type { Project } from "../types/project.types";

const project = writable<Project>([]);

export { project };

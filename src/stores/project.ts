import { writable } from "svelte/store";
import type { Project } from "../services/project";

const project = writable<Project>({});

export { project };

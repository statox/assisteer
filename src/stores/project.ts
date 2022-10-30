import { Writable, writable } from 'svelte/store';
import type { Project } from '../services/project';

const defaultProject = {
    name: 'Default project',
    objects: {}
};

const storedProjectStr = localStorage.getItem('project');

let project: Writable<Project>;
if (storedProjectStr !== null) {
    try {
        project = writable<Project>(JSON.parse(storedProjectStr) as Project);
    } catch (e) {
        console.error('Couldnt load project from local storage');
        project = writable<Project>(defaultProject);
    }
} else {
    project = writable<Project>(defaultProject);
}

project.subscribe((value) => {
    localStorage.setItem('project', JSON.stringify(value));
});

export { defaultProject, project };

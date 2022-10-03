import type { Project } from "../project";

export type ProjectStorageStats = {
    totalObjects: number;
};

const getProjectStorageStats = (project: Project): ProjectStorageStats => {
    return {
        totalObjects: Object.keys(project).length
    }
}

export { getProjectStorageStats };

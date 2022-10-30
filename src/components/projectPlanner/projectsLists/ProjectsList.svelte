<script lang="ts">
    import { onMount } from 'svelte';
    import { getPlanet } from '../../../services/data/planets';
    import { project } from '../../../stores';
    import { selectedPowerPlanet } from '../../../stores/selectedPowerPlanet';
    import ItemName from '../../utils/ItemName.svelte';
    import defaultProjectList from '../../../data/assisteer/defaultProjects.json';

    type SavedProject = {
        planet: string;
        objects: {
            [objectId: string]: number;
        };
        name: string;
    };

    let name: string;
    const savedProjectsKey = 'savedProjectsList';

    let projectsList: SavedProject[];
    const storedProjectsListStr = localStorage.getItem(savedProjectsKey);
    if (storedProjectsListStr) {
        try {
            projectsList = JSON.parse(storedProjectsListStr) as SavedProject[];
        } catch (e) {
            projectsList = defaultProjectList;
        }
    } else {
        projectsList = defaultProjectList;
    }

    const saveProject = () => {
        const savedProject: SavedProject = {
            planet: $selectedPowerPlanet.id,
            objects: $project.objects,
            name
        };

        $project.name = name;

        const projectIndex = projectsList.findIndex((p) => p.name === name);

        if (projectIndex >= 0) {
            projectsList[projectIndex] = savedProject;
        } else {
            projectsList.push(savedProject);
        }

        localStorage.setItem(savedProjectsKey, JSON.stringify(projectsList));
        projectsList = projectsList;
    };

    const onSelect = (selectedProject: SavedProject) => {
        $project = {
            name: selectedProject.name,
            objects: selectedProject.objects
        };
        $selectedPowerPlanet = getPlanet(selectedProject.planet);
        name = selectedProject.name;
    };

    const onDelete = (selectedProject: SavedProject) => {
        const projectIndex = projectsList.findIndex((p) => p.name === selectedProject.name);
        projectsList.splice(projectIndex, 1);
        projectsList = projectsList;
    };

    onMount(() => {
        if ($project && $project.name) {
            name = $project.name;
        }
    });
</script>

<main>
    <div class="content-section">
        <h3 class="content-header">Projects List</h3>
        <div class="container">
            <div>
                <input type="text" bind:value={name} />
                <button on:click={saveProject}>Save current project</button>
            </div>
            {#key projectsList}
                <div>
                    {#each projectsList as savedProject}
                        <div
                            class="d-flex justify-content-between pointer p-1"
                            class:selected={savedProject.name === name}
                            on:click={() => onSelect(savedProject)}
                        >
                            <span class="important-word">{savedProject.name}</span>

                            <ItemName item={getPlanet(savedProject.planet)} pictureType={'icon'} />

                            <button class="btn-remove" on:click={() => onDelete(savedProject)}>
                                <span class="bi bi-x-lg" />
                            </button>
                        </div>
                    {/each}
                </div>
            {/key}
        </div>
    </div>
</main>

<style>
    .pointer {
        cursor: pointer;
    }
    .btn-remove {
        border: 1px solid var(--red);
        background-color: var(--red);
        color: var(--white);
    }
    .selected {
        background: var(--pale-blue);
        border-radius: 5px;
        font-weight: bold;
    }
</style>

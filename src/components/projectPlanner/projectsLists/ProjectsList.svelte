<script lang="ts">
    import { getPlanet } from '../../../services/data/planets';
    import { project } from '../../../stores';
    import { selectedPowerPlanet } from '../../../stores/selectedPowerPlanet';

    type SavedProject = {
        planet: string;
        objects: {
            [objectId: string]: number;
        };
        name: string;
    };

    let name: string = 'Default name';
    const savedProjectsKey = 'savedProjectsList';

    let projectsList: SavedProject[];
    const storedProjectsListStr = localStorage.getItem(savedProjectsKey);
    if (storedProjectsListStr) {
        try {
            projectsList = JSON.parse(storedProjectsListStr) as SavedProject[];
        } catch (e) {
            projectsList = [];
        }
    } else {
        projectsList = [];
    }

    const saveProject = () => {
        const savedProject: SavedProject = {
            planet: $selectedPowerPlanet.id,
            objects: $project,
            name
        };

        projectsList.push(savedProject);
        projectsList = projectsList;
        localStorage.setItem(savedProjectsKey, JSON.stringify(projectsList));
    };

    const onSelect = (selectedProject: SavedProject) => {
        $project = selectedProject.objects;
        $selectedPowerPlanet = getPlanet(selectedProject.planet);
        name = selectedProject.name;
    };
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
                        <div class="d-flex justify-content-between" on:click={() => onSelect(savedProject)}>
                            <div>{savedProject.name}</div>
                            <div>{savedProject.planet}</div>
                        </div>
                    {/each}
                </div>
            {/key}
        </div>
    </div>
</main>

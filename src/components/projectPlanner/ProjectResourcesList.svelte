<script lang="ts">
    import { afterUpdate } from "svelte";
    import {
        getProjectResourcesList,
        Project,
        ResourceList,
    } from "../../services/project";
    export let project: Project;

    let resourcesList: ResourceList = {};

    afterUpdate(() => {
        if (!project) {
            return;
        }
        resourcesList = getProjectResourcesList(project);
    });
</script>

<main>
    <div>
        <h3 class="content-header">Resource list</h3>
        {#each Object.keys(resourcesList) as category}
            <div>
                <h4>{category}</h4>
                {#each Object.keys(resourcesList[category]) as objectName}
                    <p>{objectName} x{resourcesList[category][objectName]}</p>
                {/each}
            </div>
        {/each}
    </div>
</main>

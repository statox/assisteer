<script lang="ts">
    import { afterUpdate } from "svelte";
    import {
        getProjectPowerStats,
        ProjectPowerStats,
    } from "../../services/data/power";
    import { project } from "../../stores";

    let collapsed = false;

    let projectData: ProjectPowerStats;

    const updateProjectData = () => {
        projectData = getProjectPowerStats($project);
    };

    afterUpdate(() => {
        if (!$project) {
            return;
        }
        updateProjectData();
    });
</script>

<main>
    <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
        Power analyser
    </h3>
    <div class="container" class:hidden={collapsed === true}>
        {#if projectData}
            {#if projectData["producer"].total > 0}
                <div>
                    <h4 class="content-subheader">Power production</h4>
                    <p>Max instant production: {projectData["producer"].total} U/s</p>
                    {#each projectData["producer"].items as item}
                        <div class="row align-items-center bottom-separator">
                            <div class="col-sm-4">
                                <span class="important-word">
                                    <img
                                        class="img-fluid text-sized-image"
                                        src={item.object.url.icon}
                                        alt={item.object.labels.en}
                                    />
                                    &nbsp;{item.objectName}
                                </span>
                            </div>
                            <div class="col-sm-4 text-align-center">
                                {item.quantity} x {item.powerStats.output} U/s
                            </div>
                            <div class="col-sm-4 text-align-center">
                                total: {item.quantity * item.powerStats.output} U/s
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}

            {#if projectData["storage"].total > 0}
                <div>
                    <h4 class="content-subheader">Power storage</h4>
                    <p>Total capacity: {projectData["storage"].total} U</p>
                    {#each projectData["storage"].items as item}
                        <div class="row align-items-center bottom-separator">
                            <div class="col-sm-4">
                                <span class="important-word">
                                    <img
                                        class="img-fluid text-sized-image"
                                        src={item.object.url.icon}
                                        alt={item.object.labels.en}
                                    />
                                    &nbsp;{item.objectName}
                                </span>
                            </div>
                            <div class="col-sm-4 text-align-center">
                                {item.quantity} x {item.powerStats.capacity} U
                            </div>
                            <div class="col-sm-4 text-align-center">
                                total: {item.quantity *
                                    item.powerStats.capacity} U
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}

            {#if projectData["consumer"].total > 0}
                <div>
                    <h4 class="content-subheader">Power consumption</h4>
                    <p>
                        Max instant consumption: {projectData["consumer"].total} U/s
                    </p>
                    {#each projectData["consumer"].items as item}
                        <div class="row align-items-center bottom-separator">
                            <div class="col-sm-4">
                                <span class="important-word">
                                    <img
                                        class="img-fluid text-sized-image"
                                        src={item.object.url.icon}
                                        alt={item.object.labels.en}
                                    />
                                    &nbsp;{item.objectName}
                                </span>
                            </div>
                            <div class="col-sm-4 text-align-center">
                                {item.quantity} x {item.powerStats.input} U/s
                            </div>
                            <div class="col-sm-4 text-align-center">
                                total: {item.quantity *
                                    item.powerStats.input} U/s
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        {/if}
    </div>
</main>

<style>
    .text-align-center {
        text-align: center;
    }
    .text-sized-image {
        width: 2em;
    }
    .bottom-separator {
        margin-bottom: 1em;
    }
</style>

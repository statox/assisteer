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
            {#if projectData["producer"].total > 0 || projectData["consumer"].total > 0 || projectData["storage"].totalCapacity > 0}
                <div class="row">
                    <div class="col-md-6">
                        <div>
                            Max instant production: {projectData["producer"]
                                .total} U/s
                        </div>
                        <div>
                            Max instant consumption: {projectData["consumer"]
                                .total} U/s
                        </div>
                        <div>
                            Exceeding power production: {projectData.exceedingProduction}
                            U/s
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div>
                            Total storage capacity: {projectData["storage"]
                                .totalCapacity} U
                        </div>
                        <div>
                            Max storage throughput: {projectData["storage"]
                                .totalThroughput} U/s
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">Time to fill storage:</div>
                    <div class="col">
                        <div>
                            All tools on {Math.ceil(
                                projectData.secondsToFillStorage.withAllToolsOn
                            )}
                        </div>
                        <div>
                            All tools off {Math.ceil(
                                projectData.secondsToFillStorage.withAllToolsOff
                            )}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">Time to empty storage</div>
                    <div class="col">
                        <div>
                            With power on {Math.floor(
                                projectData.secondsToEmptyStorage.withPowerOn
                            )}
                        </div>
                        <div>
                            With power off {Math.floor(
                                projectData.secondsToEmptyStorage.withPowerOff
                            )}
                        </div>
                    </div>
                    <p />
                </div>
            {/if}
            {#if projectData["producer"].total > 0}
                <div>
                    <h4 class="content-subheader">Power production</h4>
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

            {#if projectData["storage"].totalCapacity > 0}
                <div>
                    <h4 class="content-subheader">Power storage</h4>
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
                                total: {item.quantity * item.powerStats.input} U/s
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

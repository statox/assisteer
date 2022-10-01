<script lang="ts">
    import { afterUpdate } from "svelte";
    import {
        getProjectPowerStats,
        ProjectPowerStats,
    } from "../../services/data/power";
    import { project } from "../../stores";

    let collapsed = false;
    let hasDataToShow = false;

    let projectData: ProjectPowerStats;

    const updateProjectData = () => {
        projectData = getProjectPowerStats($project);
        hasDataToShow = projectData.storage.totalCapacity > 0 ||
            projectData.consumer.total > 0 ||
            projectData.producer.total > 0;
    };

    afterUpdate(() => {
        if (!$project) {
            return;
        }
        updateProjectData();
    });
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
            Power analyser
        </h3>
        <div class="container" class:hidden={collapsed === true}>
            {#if !hasDataToShow}
                <p>Nothing to show. Add objects using power to the project in the Inventory section.</p>
            {/if}
            {#if projectData}
                {#if projectData["producer"].total > 0 || projectData["consumer"].total > 0 || projectData["storage"].totalCapacity > 0}
                    <div class="info small-text">
                        The computations use the reference values for each parameters:
                        <ul>
                            <li>The throughput values of the power sources are the ones on Sylva and the variations in daylight and wind conditions are not factored in</li>
                            <li>The tools are assumed to be working constanstly at full capacity</li>
                        </ul>
                        Your in-game experience will probably differ from the computed values, these are just for reference.
                        <i>You can find the coefficient for each planet in the wiki</i>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h4 class="content-subheader">Max instant</h4>
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td>Max production</td>
                                        <td><b>{projectData["producer"] .total}</b> U/s</td>
                                    </tr>
                                    <tr>
                                        <td>Max consumption</td>
                                        <td><b>{projectData["consumer"].total}</b> U/s</td>
                                    </tr>
                                    <tr>
                                        <td>Excess production</td>
                                        <td><b class={projectData.exceedingProduction < 0 ? 'red' : 'green'}>{projectData.exceedingProduction}</b> U/s</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col">
                            <h4 class="content-subheader">Storage</h4>
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td>Total capacity</td>
                                        <td><b>{projectData["storage"].totalCapacity}</b> U</td>
                                    </tr>
                                    <tr>
                                        <td>Max throughput</td>
                                        <td><b class={projectData["storage"].totalThroughput >= projectData["consumer"].total ? 'green' : 'red'}>{projectData["storage"].totalThroughput}
                                        </b> U/s</td>
                                    </tr>
                                    <tr>
                                        <th>Time to fill</th>
                                    </tr>
                                    <tr>
                                        <td>All tools on</td>
                                        <td><b class={projectData.secondsToFillStorage.withAllToolsOn > 0 ? 'green' : 'red'}>{projectData.secondsToFillStorage.withAllToolsOn}</b> s</td>
                                    </tr>
                                    <tr>
                                        <td>All tools off</td>
                                        <td><b>{projectData.secondsToFillStorage.withAllToolsOff}</b> s</td>
                                    </tr>
                                    <tr>
                                        <th>Time to empty</th>
                                    </tr>
                                    <tr>
                                        <td>Power on</td>
                                        <td><b class={projectData.secondsToEmptyStorage.withPowerOn === 0 ? 'green' : 'red'}>{projectData.secondsToEmptyStorage.withPowerOn}</b> s</td>
                                    </tr>
                                    <tr>
                                        <td>Power off</td>
                                        <td><b>{projectData.secondsToEmptyStorage.withPowerOff}</b> s</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                {/if}
                <div class="row">
                    {#if projectData["producer"].total > 0}
                        <h4 class="content-subheader">Power production</h4>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td class="small-header">By object</td>
                                    <td class="small-header">By type</td>
                                </tr>
                            </thead>
                            <tbody>
                                {#each projectData["producer"].items as item}
                                    <tr>
                                        <td>
                                            <span class="important-word">
                                                <img
                                                    class="img-fluid text-sized-image"
                                                    src={item.object.url.icon}
                                                    alt={item.object.labels.en}
                                                />
                                                &nbsp;{item.objectName}
                                            </span>
                                        </td>
                                        <td>
                                            {item.quantity} x <b>{item.powerStats.output}</b> U/s
                                        </td>
                                        <td>
                                            <b>{item.quantity * item.powerStats.output}</b> U/s
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    {/if}
                    {#if projectData["storage"].totalCapacity > 0}
                        <h4 class="content-subheader">Power storage</h4>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td class="small-header">By object</td>
                                    <td class="small-header">By type</td>
                                </tr>
                            </thead>
                            <tbody>
                                {#each projectData["storage"].items as item}
                                    <tr>
                                        <td>
                                            <span class="important-word">
                                                <img
                                                    class="img-fluid text-sized-image"
                                                    src={item.object.url.icon}
                                                    alt={item.object.labels.en}
                                                />
                                                &nbsp;{item.objectName}
                                            </span>
                                        </td>
                                        <td>
                                            {item.quantity} x <b>{item.powerStats.capacity}</b> U
                                        </td>
                                        <td>
                                            <b>{item.quantity * item.powerStats.capacity}</b> U
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    {/if}
                    {#if projectData["consumer"].total > 0}
                        <h4 class="content-subheader">Power consumption</h4>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td class="small-header">By object</td>
                                    <td class="small-header">By type</td>
                                </tr>
                            </thead>
                            <tbody>
                                {#each projectData["consumer"].items as item}
                                    <tr>
                                        <td>
                                            <span class="important-word">
                                                <img
                                                    class="img-fluid text-sized-image"
                                                    src={item.object.url.icon}
                                                    alt={item.object.labels.en}
                                                />
                                                &nbsp;{item.objectName}
                                            </span>
                                        </td>
                                        <td>
                                            {item.quantity} x <b>{item.powerStats.input}</b> U/s
                                        </td>
                                        <td>
                                            <b>{item.quantity * item.powerStats.input}</b> U/s
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    .table-borderless tr {
        border: 0;
    }
    .text-sized-image {
        width: 2em;
    }
    .red {
        color: var(--red);
    }
    .green {
        color: lightgreen;
    }
    .small-text {
        font-size: 0.7em;
    }
    .small-header {
        font-size: 0.7em;
    }
    .info {
        background: #d6edff;
        padding: 10px;
        border: 2px solid var(--blue);
        margin: 10px;
        color: var(--blue);
        border-radius: 5px;
    }
</style>

<script lang="ts">
    import { getProjectPowerStats, ProjectPowerStats } from '../../../services/data/power';
    import { project } from '../../../stores';
    import { selectedPowerPlanet } from '../../../stores/selectedPowerPlanet';
    import PlanetSelection from './PlanetSelection.svelte';
    import ProjectPowerTimeline from './ProjectPowerTimeline.svelte';
    import PowerObjectsList from './PowerObjectsList.svelte';

    let collapsed = false;
    let hasDataToShow = false;
    let projectData: ProjectPowerStats;

    $: {
        projectData = getProjectPowerStats($project, $selectedPowerPlanet);
        hasDataToShow =
            projectData.storage.totalCapacity > 0 || projectData.consumer.total > 0 || projectData.producer.total > 0;
    }
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>Power analyser</h3>
        <div class="container" class:hidden={collapsed === true}>
            {#if !hasDataToShow}
                <p>Nothing to show. Add objects using power to the project in the Inventory section.</p>
            {/if}
            {#if projectData}
                {#if projectData['producer'].total > 0 || projectData['consumer'].total > 0 || projectData['storage'].totalCapacity > 0}
                    <div class="info small-text">
                        Select the planet you want to host your project, the tool will compute your power needs using
                        several factors:
                        <ul>
                            <li>
                                The solar panels efficiency is factored with the <a
                                    target="blank"
                                    href="https://astroneer.fandom.com/wiki/Solar_Panels">coefficients from the wiki</a
                                >
                            </li>
                            <li>
                                The length of the daylight cycle is not factored, all values are for day light time.
                            </li>
                            <li>
                                The wind turbines active time is factored with the <a
                                    target="blank"
                                    href="https://astroneer.fandom.com/wiki/Wind_Turbines">coefficients from the wiki</a
                                >. Note that these coefficients might differ even in planets showing the same wind power
                                in Astropedia.
                            </li>
                            <li>The tools are assumed to be working constanstly at full capacity</li>
                        </ul>
                        Your in-game experience might differ from the computed values, these are just for reference.
                    </div>
                    <h4 class="content-subheader">Planet hosting the project</h4>
                    <div class="row">
                        <PlanetSelection />
                    </div>
                    <div class="row">
                        <ProjectPowerTimeline />
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h4 class="content-subheader">Max instant</h4>
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td>Max production</td>
                                        <td>{projectData['producer'].total} U/s</td>
                                    </tr>
                                    <tr>
                                        <td>Max consumption</td>
                                        <td>{projectData['consumer'].total} U/s</td>
                                    </tr>
                                    <tr>
                                        <td>Excess production</td>
                                        <td
                                            ><span class={projectData.exceedingProduction < 0 ? 'red' : 'green'}
                                                >{projectData.exceedingProduction}</span
                                            > U/s</td
                                        >
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
                                        <td>{projectData['storage'].totalCapacity} U</td>
                                    </tr>
                                    <tr>
                                        <td>Max throughput</td>
                                        <td>
                                            <span
                                                class={projectData['storage'].totalThroughput >=
                                                projectData['consumer'].total
                                                    ? 'green'
                                                    : 'red'}>{projectData['storage'].totalThroughput}</span
                                            >
                                            U/s
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Time to fill</th>
                                    </tr>
                                    <tr>
                                        <td>All tools on</td>
                                        <td
                                            ><span
                                                class={projectData.secondsToFillStorage.withAllToolsOn > 0
                                                    ? 'green'
                                                    : 'red'}>{projectData.secondsToFillStorage.withAllToolsOn}</span
                                            > s</td
                                        >
                                    </tr>
                                    <tr>
                                        <td>All tools off</td>
                                        <td>{projectData.secondsToFillStorage.withAllToolsOff} s</td>
                                    </tr>
                                    <tr>
                                        <th>Time to empty</th>
                                    </tr>
                                    <tr>
                                        <td>Power on</td>
                                        <td
                                            ><span
                                                class={projectData.secondsToEmptyStorage.withPowerOn === 0
                                                    ? 'green'
                                                    : 'red'}>{projectData.secondsToEmptyStorage.withPowerOn}</span
                                            > s</td
                                        >
                                    </tr>
                                    <tr>
                                        <td>Power off</td>
                                        <td>{projectData.secondsToEmptyStorage.withPowerOff} s</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                {/if}

                <div class="row">
                    <PowerObjectsList {projectData} />
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    .red {
        color: var(--red);
    }
    .green {
        color: lightgreen;
    }
    .small-text {
        font-size: 0.9em;
    }
</style>

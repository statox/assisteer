<script lang="ts">
    import { getAllPlanets, Planet } from '../../services/data/planets';
    import { getProjectPowerStats, ProjectPowerStats } from '../../services/data/power';
    import { project } from '../../stores';
    import ObjectName from '../utils/ObjectName.svelte';
    import PlanetName from '../utils/PlanetName.svelte';

    const planets = getAllPlanets();
    let collapsed = false;
    let hasDataToShow = false;
    let projectData: ProjectPowerStats;

    // TODO store the selected planet as part of the project
    let selectedPlanet: Planet;
    try {
        const storedSelectedPlanetId = localStorage.getItem('selectedPlanet');
        if (storedSelectedPlanetId !== null) {
            selectedPlanet = planets.find((p) => p.id === storedSelectedPlanetId) || planets[0];
        } else {
            selectedPlanet = planets[0];
        }
    } catch (e) {
        selectedPlanet = planets[0];
        console.error('Could not retrieve the selected planet from local storage');
        console.error(e);
    }

    const updateProjectData = () => {
        projectData = getProjectPowerStats($project, selectedPlanet);
        hasDataToShow =
            projectData.storage.totalCapacity > 0 || projectData.consumer.total > 0 || projectData.producer.total > 0;
    };

    $: {
        (() => {
            if (!$project || !selectedPlanet) {
                return;
            }
            updateProjectData();
            try {
                localStorage.setItem('selectedPlanet', selectedPlanet.id);
            } catch (e) {
                console.error('Could not store the selected planet in local storage');
                console.error(e);
            }
        })();
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
                    <h4 class="content-subheader">Planet to setup the project</h4>
                    <div class="row row-cols-auto">
                        {#each planets as planet}
                            <div
                                class="col planet-div"
                                class:selected={planet.id === selectedPlanet.id}
                                on:click={() => (selectedPlanet = planet)}
                            >
                                <PlanetName
                                    {planet}
                                    pictureType={'icon'}
                                    boldName={true}
                                    largerIcon={true}
                                    largerText={true}
                                />

                                <div class="row">
                                    <div class="col-3">
                                        <img
                                            class="img-fluid planet-img rounded-circle"
                                            src={planet.url.image}
                                            alt={planet.id}
                                        />
                                    </div>
                                    <div class="col">
                                        <div>
                                            <span class="important-word">Solar </span>{planet.power.sun}
                                        </div>
                                        <div>
                                            <span class="important-word">Wind </span>{planet.power.wind}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span class="important-word">Wind activity </span>{Math.round(
                                        planet.power.wikiWindCoefficient * 100
                                    )}%
                                </div>
                                <div>
                                    <span class="important-word">Daylight cycle </span>{planet.power
                                        .dayNightCycleSeconds} s
                                </div>
                            </div>
                        {/each}
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
                    {#if projectData['producer'].total > 0}
                        <h4 class="content-subheader">Power production</h4>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <td />
                                    <td class="small-header">By object</td>
                                    <td class="small-header">By type</td>
                                </tr>
                            </thead>
                            <tbody>
                                {#each projectData['producer'].items as item}
                                    <tr>
                                        <td>
                                            <ObjectName object={item.object} pictureType="icon" importantWord={true} />
                                        </td>
                                        <!-- this is here for typeguard -->
                                        {#if item.powerStats.type === 'producer'}
                                            <td>
                                                {item.quantity} x {item.powerStats.output} U/s
                                            </td>
                                            <td>
                                                {item.quantity * item.powerStats.output} U/s
                                            </td>
                                        {/if}
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    {/if}
                    {#if projectData['storage'].totalCapacity > 0}
                        <h4 class="content-subheader">Power storage</h4>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <td />
                                    <td class="small-header">By object</td>
                                    <td class="small-header">By type</td>
                                </tr>
                            </thead>
                            <tbody>
                                {#each projectData['storage'].items as item}
                                    <tr>
                                        <td>
                                            <ObjectName object={item.object} pictureType="icon" importantWord={true} />
                                        </td>
                                        <!-- this is here for typeguard -->
                                        {#if item.powerStats.type === 'storage'}
                                            <td>
                                                {item.quantity} x {item.powerStats.capacity} U
                                            </td>
                                            <td>
                                                {item.quantity * item.powerStats.capacity} U
                                            </td>
                                        {/if}
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    {/if}
                    {#if projectData['consumer'].total > 0}
                        <h4 class="content-subheader">Power consumption</h4>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <td />
                                    <td class="small-header">By object</td>
                                    <td class="small-header">By type</td>
                                </tr>
                            </thead>
                            <tbody>
                                {#each projectData['consumer'].items as item}
                                    <tr>
                                        <td>
                                            <ObjectName object={item.object} pictureType="icon" importantWord={true} />
                                        </td>
                                        <!-- this is here for typeguard -->
                                        {#if item.powerStats.type === 'consumer'}
                                            <td>
                                                {item.quantity} x {item.powerStats.input} U/s
                                            </td>
                                            <td>
                                                {item.quantity * item.powerStats.input} U/s
                                            </td>
                                        {/if}
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
    .planet-div {
        margin: 1vw;
        border: 3px solid transparent;
        border-radius: 5px;
    }
    .planet-div.selected {
        background: #d6edff;
        /* border: 3px solid var(--blue); */
        /* border-radius: 5px; */
    }
    .table-borderless tr {
        border: 0;
    }
    .red {
        color: var(--red);
    }
    .green {
        color: lightgreen;
    }
    .small-text {
        font-size: 0.9em;
    }
    .small-header {
        font-size: 0.7em;
    }
</style>

<script lang="ts">
    import { getAllFlora } from '../../services/data/flora';
    import { getPlanet } from '../../services/data/planets';
    import PlanetName from '../utils/PlanetName.svelte';

    const flora = getAllFlora();
</script>

<main>
    <div class="content-section">
        <h3 class="content-header">Flora</h3>
        <div class="warning">Warning: This page contains spoilers about the game mechanisms.</div>
        <div class="info">
            <p>
                The wiki has a reference of <a target="none" href="https://astroneer.fandom.com/wiki/Flora">
                    all the flora from the different planets
                </a>.
            </p>
        </div>
        <div class="container table-responsive">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {#each flora as plant}
                        <tr>
                            <td>{plant.labels.en}</td>
                            <td>{plant.type}</td>
                            <td>
                                {#each Object.keys(plant.location) as planetId}
                                    <div class="d-flex justify-content-between">
                                        {#if planetId !== 'all'}
                                            {@const planet = getPlanet(planetId)}
                                            <PlanetName {planet} pictureType={'icon'} />

                                            <span>
                                                {plant.location[planetId]}
                                            </span>
                                        {:else}
                                            <span class="important-word">Available on all planets</span>
                                        {/if}
                                    </div>
                                {/each}
                            </td>
                            <td>
                                <img class="img-fluid planet-img" src={plant.url.image} alt={plant.labels.en} />
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>

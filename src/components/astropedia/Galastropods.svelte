<script lang="ts">
    import { getAllGalastropods } from '../../services/data/galastropods';
    import PlanetName from '../utils/PlanetName.svelte';
    import { getPlanet } from '../../services/data/planets';
    import ObjectName from '../utils/ObjectName.svelte';
    import { getObject } from '../../services/data/objects';

    const galastropods = getAllGalastropods();
</script>

<main>
    <div class="content-section">
        <h3 class="content-header">Flora</h3>
        <div class="warning">Warning: This page contains spoilers about the game mechanisms.</div>
        <div class="info">
            <p>
                The wiki has a reference of <a target="none" href="https://astroneer.fandom.com/wiki/Galastropods">
                    all the galastropods
                </a>.
            </p>
        </div>
        <div class="container table-responsive">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th />
                        <th>Planet</th>
                        <th>Resource</th>
                        <th>Flora</th>
                        <th>Use</th>
                    </tr>
                </thead>
                <tbody>
                    {#each galastropods as galastro}
                        <tr>
                            <td>{galastro.labels.en}</td>
                            <td><PlanetName planet={getPlanet(galastro.planet)} pictureType={'icon'} /></td>
                            <td><ObjectName object={getObject(galastro.resource)} pictureType={'icon'} /></td>
                            <td>{galastro.flora}</td>
                            <td>{galastro.use}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>

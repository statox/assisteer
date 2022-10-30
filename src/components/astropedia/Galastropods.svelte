<script lang="ts">
    import { getAllGalastropods, getGalastropod } from '../../services/data/galastropods';
    import ItemName from '../utils/ItemName.svelte';
    import { getPlanet } from '../../services/data/planets';
    import ObjectName from '../utils/ObjectName.svelte';
    import { getObject } from '../../services/data/objects';

    const galastropods = getAllGalastropods();
</script>

<main class="container">
    <div class="content-section">
        <h3 class="content-header">Galastropods</h3>
        <div class="warning">Warning: This page contains spoilers about the game mechanisms.</div>
        <div class="info">
            <p>
                The wiki has a reference of <a target="none" href="https://astroneer.fandom.com/wiki/Galastropods">
                    all the galastropods
                </a>.
            </p>
        </div>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th />
                        <th>Planet</th>
                        <th>Resource</th>
                        <th>Flora</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {#each galastropods as galastro}
                        <tr>
                            <td class="no-border justify-content-left">
                                <ItemName item={getGalastropod(galastro.id)} pictureType={'icon'} pictureSize="large" />
                            </td>
                            <td class="no-border justify-content-left">
                                <ItemName item={getPlanet(galastro.planet)} pictureType={'icon'} />
                            </td>
                            <td class="no-border justify-content-left">
                                <ObjectName object={getObject(galastro.resource)} pictureType={'icon'} />
                            </td>
                            <td class="no-border justify-content-left">{galastro.flora}</td>
                            <td rowspan="2">
                                <img class="img-fluid" src={galastro.url.image} alt={galastro.labels.en} />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="use">{galastro.use}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>

<style>
    .use {
        text-align: justify;
    }
    .no-border {
        border: none;
    }
</style>

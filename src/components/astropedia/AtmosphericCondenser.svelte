<script lang="ts">
    import { getObject } from '../../services/data/objects';

    import { getAllPlanets } from '../../services/data/planets';
    import { getAllAlmosphericResourcesLocation } from '../../services/data/resources';
    import { alphaSort } from '../../services/utils';
    import ItemName from '../utils/ItemName.svelte';
    import ObjectName from '../utils/ObjectName.svelte';

    const planets = getAllPlanets();
    const locations = getAllAlmosphericResourcesLocation();
</script>

<main>
    <div class="content-section">
        <h3 class="content-header">Atmospheric Condenser</h3>

        <div class="info">
            The information on this page is compiled from the
            <a target="none" href="https://astroneer.fandom.com/wiki/Atmospheric_Condenser"
                >Atmospheric Condenser's wiki page</a
            >.
        </div>

        <div class="container table-responsive">
            <h3 class="content-subheader">Densities</h3>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Resource</th>
                        {#each planets as planet}
                            <th>
                                <ItemName item={planet} pictureType={'icon'} />
                            </th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each Object.keys(locations).sort(alphaSort) as resource}
                        <tr>
                            <td>
                                <ObjectName object={getObject(resource)} pictureType={'icon'} />
                            </td>
                            {#each planets as planet}
                                <td>
                                    {planet.gases[resource] || 'x'}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <div class="container table-responsive">
            <h3 class="content-subheader">Power considerations</h3>
            <p>
                If the Atmospheric Condenser is starved for power, the time required to produce each unit is increased,
                inversely proportionate to the fraction of power available to power required (20 U).
            </p>
            <p>
                The amount of power units required to collect a unit of gas increases dramatically at lower PPU ratings:
                <br />
                It only costs 33% more power units per unit of gas at 75 PPU compared to 100 PPU.
                <br />
                But 300% more per unit of gas at 25 PPU compared to 100 PPU.
            </p>
        </div>

        <div class="container table-responsive">
            <h3 class="content-subheader">Condensation time</h3>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Density (PPU)</th>
                        <td>100</td>
                        <td>75</td>
                        <td>50</td>
                        <td>25</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Time to extract 1 unit of gas (1U)</th>
                        <td>10s</td>
                        <td>13.33s</td>
                        <td>20s</td>
                        <td>40s</td>
                    </tr>
                    <tr>
                        <th>Time to extract 1 single gas canister (5U)</th>
                        <td>50s</td>
                        <td>66.6s</td>
                        <td>100s</td>
                        <td>200s</td>
                    </tr>
                    <tr>
                        <th>Time to extract 1 medium gas canister (160U)</th>
                        <td>27m</td>
                        <td>36m</td>
                        <td>53m</td>
                        <td>1h 45m</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</main>

<script lang="ts">
    import { getObject } from '../../services/data/objects';
    import { getSoilTradingRates } from '../../services/trading';
    import { alphaSort, formatedDurationFromSeconds } from '../../services/utils';

    import ObjectName from '../utils/ObjectName.svelte';

    const trades = getSoilTradingRates();

    const timeByNumberOfResources = {
        '8': formatedDurationFromSeconds(45),
        '6': formatedDurationFromSeconds(44),
        '4': formatedDurationFromSeconds(42),
        '2': formatedDurationFromSeconds(41),
        '1': formatedDurationFromSeconds(40)
    };
</script>

<main>
    <div class="content-section">
        <h3 class="content-header">Soil Centrifuge</h3>

        <div class="info">
            The information on this page is compiled from the
            <a target="none" href="https://astroneer.fandom.com/wiki/Soil_Centrifuge">Soil Centrifuge's wiki page</a>.
            <br />
            You can open the Soil Centrifuge in the object selection by clicking this:
            <ObjectName object={getObject('soil centrifuge')} pictureType="icon" />
        </div>

        <div class="container table-responsive">
            <h3 class="content-subheader">Uses</h3>
            <p>Number of resources produced with 2 small canisters of soil in one run</p>
            <p>Each run draws 182.25U of power regardless of how many items the machine produces.</p>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Resource</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {#each Object.keys(trades).sort(alphaSort) as resource}
                        <tr>
                            <td>
                                <ObjectName object={getObject(resource)} pictureType={'icon'} />
                            </td>
                            <td>
                                {trades[resource] * 2}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <div class="container table-responsive">
            <h3 class="content-subheader">Centrifugation Time</h3>
            <p>The Soil Centrifuge takes 30.375 seconds to complete the process, not including start up.</p>
            <p>
                The overall process, including the time to load two Canisters worth of Soil from a Medium Soil Canister,
                as well as the time for the machine head to fill each of the necessary tubes in the Centrifuge, varies
                depending on the resource selected and thus the number of tubes that need to be filled. Resources that
                produce at a lower number per Centrifuge cycle require more soil per tube, but the time increase to fill
                the tubes does not completely offset the time saved from filling fewer tubes before each Centrifuge
                cycle. Thus resources that produce more per Centrifuge cycle also take slightly longer to run each
                cycle.
            </p>
            <p>Total time to operate depending on the number of resources produced:</p>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Number of resources produced</th>
                        <th>Time to run</th>
                    </tr>
                </thead>
                <tbody>
                    {#each Object.keys(timeByNumberOfResources) as nbResourcesProduced}
                        <tr>
                            <td>
                                {nbResourcesProduced}
                            </td>
                            <td>
                                {timeByNumberOfResources[nbResourcesProduced]}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>

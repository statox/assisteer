<script lang="ts">
    import { settings, project } from '../../stores';
    import { getObject } from '../../services/data/objects';
    import { getProjectTradingStats, TradingStats } from '../../services/trading';
    import ObjectName from '../utils/ObjectName.svelte';
    import Trade from '../utils/Trade.svelte';

    let collapsed = false;
    let tradeStats: TradingStats;

    $: {
        tradeStats = getProjectTradingStats($project);
    }
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>Scrap & Soil Requirements</h3>
        <div class="row" class:hidden={collapsed === true || tradeStats.totalSoil !== 0 || tradeStats.totalScrap !== 0}>
            <p>Nothing to show. Add objects to the project in the Inventory section.</p>
        </div>
        <div class="container">
            <div
                class="table-responsive"
                class:hidden={collapsed === true || (tradeStats.totalSoil === 0 && tradeStats.totalScrap === 0)}
            >
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Resource</th>
                            <th scope="col" class="text-align-center">Required Quantity</th>
                            <th scope="col">Soil</th>
                            <th scope="col">Scrap</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="2">All resources in project</td>
                            <td>
                                <ObjectName
                                    object={getObject('soil')}
                                    pictureType={$settings.pictureType}
                                    quantity={tradeStats.totalSoil}
                                    hideName={true}
                                />
                            </td>
                            <td>
                                <div class="d-inline-flex">
                                    <ObjectName
                                        object={getObject('scrap')}
                                        pictureType={$settings.pictureType}
                                        quantity={tradeStats.totalScrap}
                                        hideName={true}
                                    />
                                    {#if tradeStats.totalScrapForScrapOnlyObjects > 0}
                                        &nbsp;/&nbsp;
                                        <span class="scrap-only">
                                            <ObjectName
                                                object={getObject('scrap')}
                                                pictureType={$settings.pictureType}
                                                quantity={tradeStats.totalScrapForScrapOnlyObjects}
                                                hideName={true}
                                            />
                                        </span>
                                    {/if}
                                </div>
                            </td>
                        </tr>
                        {#each tradeStats.possibleTrades as trade}
                            {@const object = getObject(trade.resourceId)}
                            <tr>
                                <td class:scrap-only={!trade.soil}>
                                    <ObjectName {object} pictureType={$settings.pictureType} showPlanets={true} />
                                </td>

                                <td class="text-align-center">
                                    {#if trade.soil}
                                        {trade.soil.resourcesProduced - trade.soil.surplus}
                                    {:else}
                                        {trade.scrap.resourcesProduced - trade.scrap.surplus}
                                    {/if}
                                </td>

                                {#each ['soil', 'scrap'] as currency}
                                    {@const toolName = { soil: 'soil centrifuge', scrap: 'trade platform' }[currency]}
                                    {@const tool = getObject(toolName)}
                                    <td>
                                        <!-- The second condition is only there as a typeguard -->
                                        {#if trade[currency] && (currency === 'soil' || currency === 'scrap')}
                                            <div>
                                                <Trade
                                                    currencyId={currency}
                                                    {object}
                                                    currencyQty={trade[currency].currencyRequired}
                                                    objectQty={trade[currency].resourcesProduced}
                                                    surplus={trade[currency].surplus}
                                                />
                                            </div>
                                            <div class="d-inline-flex">
                                                <ObjectName
                                                    object={tool}
                                                    pictureType={$settings.pictureType}
                                                    quantity={trade[currency].requiredRounds}
                                                    hideName={true}
                                                    pictureSize="small"
                                                />
                                                {trade[currency].timeToRun}s
                                            </div>
                                        {/if}
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

<style>
    .scrap-only {
        color: #c49015;
    }
</style>

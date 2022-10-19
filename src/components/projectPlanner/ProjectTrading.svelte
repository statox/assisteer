<script lang="ts">
    import { settings, project } from '../../stores';
    import { getObject } from '../../services/data/objects';
    import { getProjectTradingStats, TradingStats } from '../../services/trading';
    import ObjectName from '../utils/ObjectName.svelte';

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
                <table class="table">
                    <thead>
                        <tr>
                            <td>Resource</td>
                            <td>Required Quantity</td>
                            <td>
                                <ObjectName
                                    object={getObject('soil')}
                                    pictureType={$settings.pictureType}
                                    largerIcon={true}
                                />
                            </td>
                            <td>
                                <ObjectName
                                    object={getObject('scrap')}
                                    pictureType={$settings.pictureType}
                                    largerIcon={true}
                                />
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="2">All resources in project</td>
                            <td>{tradeStats.totalSoil}</td>
                            <td>{tradeStats.totalScrap}</td>
                        </tr>
                        {#each tradeStats.possibleTrades as trade}
                            {@const object = getObject(trade.resourceId)}
                            <tr>
                                <td>
                                    <ObjectName {object} pictureType={$settings.pictureType} largerIcon={true} />
                                </td>

                                <td>
                                    {#if trade.soil}
                                        {trade.soil.resourcesProduced - trade.soil.surplus}
                                    {:else}
                                        {trade.scrap.resourcesProduced - trade.scrap.surplus}
                                    {/if}
                                </td>

                                {#each ['soil', 'scrap'] as currency}
                                    {@const currencyObject = getObject(currency)}
                                    <td>
                                        {#if trade[currency]}
                                            <div>
                                                <ObjectName
                                                    object={currencyObject}
                                                    hideName={true}
                                                    largerIcon={true}
                                                    quantity={trade[currency].currencyRequired}
                                                    pictureType={$settings.pictureType}
                                                />
                                                :
                                                <ObjectName
                                                    {object}
                                                    hideName={true}
                                                    largerIcon={true}
                                                    quantity={trade[currency].resourcesProduced}
                                                    pictureType={$settings.pictureType}
                                                />
                                                {#if trade[currency].surplus}
                                                    (Surplus: {trade[currency].surplus})
                                                {/if}
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

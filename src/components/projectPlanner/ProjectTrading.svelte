<script lang="ts">
    import { settings, project } from "../../stores";
    import { getObject } from "../../services/data/objects";
    import { getProjectTradingStats, TradingStats } from "../../services/trading";

    let collapsed = false;
    let tradeStats: TradingStats;

    $: {
        tradeStats = getProjectTradingStats($project);
    }
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
            Scrap & Soil Requirements
        </h3>
        <div class="row" class:hidden={collapsed === true || tradeStats.totalSoil !== 0 || tradeStats.totalScrap !== 0}>
            <p>Nothing to show. Add objects to the project in the Inventory section.
        </div>
        <div class="table-responsive" class:hidden={collapsed === true || (tradeStats.totalSoil === 0 && tradeStats.totalScrap === 0)}>
            <table class="table">
                <thead>
                    <tr>
                        <td>Resource</td>
                        <td>Required Quantity</td>
                        <td>
                            Soil
                            <img
                                class="resource-icon"
                                src={getObject('soil').url[$settings.pictureType]}
                                alt={getObject('soil').labels.en}
                            />
                        </td>
                        <td>
                            Scrap
                            <img
                                class="resource-icon"
                                src={getObject('scrap').url[$settings.pictureType]}
                                alt={getObject('scrap').labels.en}
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
                        <tr>
                            <td>
                                <img
                                    class="resource-icon"
                                    src={getObject(trade.resourceId).url[$settings.pictureType]}
                                    alt={getObject(trade.resourceId).labels.en}
                                />
                                &nbsp;{getObject(trade.resourceId).labels.en}
                            </td>

                            <td>
                                {#if trade.soil}
                                    {trade.soil.resourcesProduced - trade.soil.surplus}
                                {:else}
                                    {trade.scrap.resourcesProduced - trade.scrap.surplus}
                                {/if}
                            </td>

                            {#each ['soil', 'scrap'] as currency}
                                <td>
                                    {#if trade[currency]}
                                        {trade[currency].currencyRequired}
                                        <img
                                            class="resource-icon"
                                            src={getObject(currency).url[$settings.pictureType]}
                                            alt={getObject(currency).labels.en}
                                        />
                                        for
                                        {trade[currency].resourcesProduced}
                                        <img
                                            class="resource-icon"
                                            src={getObject(trade.resourceId).url[$settings.pictureType]}
                                            alt={getObject(trade.resourceId).labels.en}
                                        />
                                        {#if trade[currency].surplus}
                                            (Surplus: {trade[currency].surplus})
                                        {/if}
                                    {/if}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                    <tbody>
            </table>
        </div>
    </div>
</main>

<style>
    .resource-icon {
        width: 1em;
    }
</style>

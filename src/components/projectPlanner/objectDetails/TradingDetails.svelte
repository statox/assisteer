<script lang="ts">
    import { BaseObject, getObject } from '../../../services/data/objects';
    import {
        getAstroniumTradingRates,
        getObjectTradingStats,
        getScrapTradingRates,
        getSoilTradingRates,
        PossibleTrades
    } from '../../../services/trading';
    import Trade from '../../utils/Trade.svelte';

    export let object: BaseObject;
    let tradingDetails: PossibleTrades;

    // Reactive declaration: The code runs on props change
    $: {
        (() => {
            if (!object) {
                return;
            }
            tradingDetails = getObjectTradingStats(object.id);
        })();
    }
</script>

<main>
    {#if tradingDetails || ['soil', 'scrap', 'astronium'].includes(object.id)}
        <div class="d-flex flex-wrap row justify-content-between">
            <h5 class="content-subheader">Trading</h5>
            {#if tradingDetails?.soil}
                <div class="d-flex justify-content-between">
                    <span class="important-word">Soil centrifuge</span>
                    <Trade
                        currencyId="soil"
                        {object}
                        currencyQty={tradingDetails.soil.currencyRequired}
                        objectQty={tradingDetails.soil.resourcesProduced}
                    />
                </div>
            {/if}

            {#if tradingDetails?.scrap}
                <div class="d-flex justify-content-between">
                    <span class="important-word">Trade platform</span>
                    <Trade
                        currencyId="scrap"
                        {object}
                        currencyQty={tradingDetails.scrap.currencyRequired}
                        objectQty={tradingDetails.scrap.resourcesProduced}
                    />
                </div>
            {/if}

            {#if object.id === 'soil'}
                {@const trades = getSoilTradingRates()}
                {#each Object.keys(trades) as objectId}
                    <Trade
                        currencyId="soil"
                        object={getObject(objectId)}
                        currencyQty={1}
                        objectQty={trades[objectId]}
                        showObjectName={true}
                    />
                {/each}
            {/if}
            {#if object.id === 'scrap'}
                {@const trades = getScrapTradingRates()}
                {#each Object.keys(trades) as objectId}
                    <Trade
                        currencyId="scrap"
                        object={getObject(objectId)}
                        currencyQty={trades[objectId].scrap}
                        objectQty={trades[objectId].item}
                        showObjectName={true}
                    />
                {/each}
            {/if}
            {#if object.id === 'astronium'}
                {@const trades = getAstroniumTradingRates()}
                {#each Object.keys(trades) as objectId}
                    <Trade
                        currencyId="astronium"
                        object={getObject(objectId)}
                        currencyQty={trades[objectId].astronium}
                        objectQty={trades[objectId].item}
                        showObjectName={true}
                    />
                {/each}
            {/if}
        </div>
    {/if}
</main>

<script lang="ts">
    import type { BaseObject } from '../../../services/data/objects';
    import { getObjectTradingStats, PossibleTrades } from '../../../services/trading';
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
    {#if tradingDetails}
        <div class="d-flex flex-wrap row justify-content-between">
            <h5 class="content-subheader">Trading</h5>
            {#if tradingDetails.soil}
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

            {#if tradingDetails.scrap}
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
        </div>
    {/if}
</main>

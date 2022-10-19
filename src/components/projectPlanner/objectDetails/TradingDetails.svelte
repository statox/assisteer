<script lang="ts">
    import { BaseObject, getObject } from '../../../services/data/objects';
    import { getObjectTradingStats, PossibleTrades } from '../../../services/trading';
    import ObjectName from '../../utils/ObjectName.svelte';

    export let object: BaseObject;
    let tradingDetails: PossibleTrades;

    const soil = getObject('soil');
    const scrap = getObject('scrap');

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
                    <span>
                        <ObjectName
                            object={soil}
                            hideName={true}
                            largerIcon={false}
                            quantity={tradingDetails.soil.currencyRequired}
                            pictureType={'icon'}
                        />
                        :
                        <ObjectName
                            {object}
                            hideName={true}
                            largerIcon={false}
                            quantity={tradingDetails.soil.resourcesProduced}
                            pictureType={'icon'}
                        />
                    </span>
                </div>
            {/if}

            {#if tradingDetails.scrap}
                <div class="d-flex justify-content-between">
                    <span class="important-word">Trade platform</span>
                    <span>
                        <ObjectName
                            object={scrap}
                            hideName={true}
                            largerIcon={false}
                            quantity={tradingDetails.scrap.currencyRequired}
                            pictureType={'icon'}
                        />
                        :
                        <ObjectName
                            {object}
                            hideName={true}
                            largerIcon={false}
                            quantity={tradingDetails.scrap.resourcesProduced}
                            pictureType={'icon'}
                        />
                    </span>
                </div>
            {/if}
        </div>
    {/if}
</main>

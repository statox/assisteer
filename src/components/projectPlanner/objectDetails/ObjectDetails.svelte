<script lang="ts">
    import type { BaseObject } from '../../../services/data/objects';
    import NaturalResourceLocationDetails from './NaturalResourceLocationDetails.svelte';
    import AtmosphericResourceLocationDetails from './AtmosphericResourceLocationDetails.svelte';
    import PowerStatsDetails from './PowerStatsDetails.svelte';
    import RecipeDetails from './RecipeDetails.svelte';
    import GenericDetails from './GenericDetails.svelte';
    import StorageDetails from './StorageDetails.svelte';
    import CanisterDetails from './CanisterDetails.svelte';
    import TradingDetails from './TradingDetails.svelte';

    export let object: BaseObject;
</script>

<main class="container">
    {#if object}
        <div class="row">
            <div class="col-sm-6">
                <h4 class="content-subheader">
                    <span class="display-inline-flex">
                        <img class="img-fluid small-image" src={object.url.icon} alt={object.labels.en} />
                        &nbsp;{object.labels.en}
                    </span>
                </h4>
                <div class="d-flex justify-content-center">
                    <img class="img-fluid" src={object.url.image} alt={object.labels.en} />
                </div>
                <div>
                    <GenericDetails {object} />
                    <PowerStatsDetails {object} />
                    <StorageDetails {object} />
                    <CanisterDetails {object} />
                    <TradingDetails {object} />
                </div>
            </div>
            <div class="col-sm-6">
                {#if 'natural' === object.category}
                    <NaturalResourceLocationDetails resource={object} />
                {:else if 'atmospheric' === object.category}
                    <AtmosphericResourceLocationDetails resource={object} />
                {:else}
                    <RecipeDetails {object} />
                {/if}
            </div>
        </div>
    {/if}
</main>

<style>
    h4 {
        margin-top: 0.3em;
    }
    img {
        margin-left: auto;
        margin-right: auto;
        margin: auto;
        display: block;
        max-height: 10vh;
    }
    .small-image {
        height: 1em;
    }
    /* Not sure why this works but allows the icon to be aligned with the text */
    .display-inline-flex {
        display: inline-flex;
    }
</style>

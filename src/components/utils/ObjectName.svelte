<script lang="ts">
    import type { BaseObject } from '../../services/data/objects';
    import { getAlmosphericResourceLocation, getNaturalResourceLocation } from '../../services/data/resources';
    import { objectSelectionModalShow, projectListModalShow, updateModalObject } from '../../stores';
    import ItemName from './ItemName.svelte';

    export let object: BaseObject;
    export let pictureType: 'icon' | 'image' | 'both';
    export let quantity: number = null;
    export let hideName: boolean = false;
    export let importantWord: boolean = false;
    export let pictureSize: 'default' | 'large' | 'larger' = 'default';
    export let showPlanets: boolean = false;
    export let classes: string[] = [];
</script>

<div
    on:click={() => {
        updateModalObject(object);
        $objectSelectionModalShow = true;
        $projectListModalShow = false;
    }}
    class:important-word={importantWord}
    class={'object-name d-flex flex-row justify-content-start ' + classes.join(' ')}
>
    {#if quantity}
        <div class="quantity">
            {quantity}&nbsp;
        </div>
    {/if}
    <div>
        {#if ['icon', 'both'].includes(pictureType)}
            <img
                class="img-fluid text-sized-image"
                class:large-text-sized-image={pictureSize === 'large'}
                class:larger-text-sized-image={pictureSize === 'larger'}
                src={object.url.icon}
                alt={object.labels.en}
            />
        {/if}
        {#if ['image', 'both'].includes(pictureType)}
            <img
                class="img-fluid text-sized-image"
                class:large-text-sized-image={pictureSize === 'large'}
                class:larger-text-sized-image={pictureSize === 'larger'}
                src={object.url.image}
                alt={object.labels.en}
            />
        {/if}
        &nbsp;
        {#if !hideName}
            <span class="label">
                {object.labels.en}
            </span>
        {/if}
    </div>

    {#if showPlanets}
        <div class="ms-auto">
            {#if object.category === 'atmospheric'}
                {#each getAlmosphericResourceLocation(object.id) || [] as location}
                    <ItemName item={location.planet} pictureType={'icon'} hideName={true} />
                {/each}
            {/if}

            {#if object.category === 'natural'}
                {@const location = getNaturalResourceLocation(object.id)}
                {#if location}
                    {@const primaryPlanet = location.primary.planet}
                    {@const secondaryPlanet = location.secondary.planet}
                    <span>
                        <ItemName item={primaryPlanet} pictureType={'icon'} hideName={true} />
                        <ItemName item={secondaryPlanet} pictureType={'icon'} hideName={true} />
                    </span>
                {/if}
            {/if}
        </div>
    {/if}
</div>

<style>
    .quantity {
        min-width: 3ex;
    }
    .object-name {
        width: 100%;
        cursor: pointer;
        white-space: nowrap;
    }
    .text-sized-image {
        width: 1em;
    }
    .large-text-sized-image {
        width: 2em;
    }
    .larger-text-sized-image {
        width: 3em;
    }
    .label {
        text-transform: capitalize;
    }
    .green {
        color: var(--green);
    }
</style>

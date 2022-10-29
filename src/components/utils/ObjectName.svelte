<script lang="ts">
    import type { BaseObject } from '../../services/data/objects';
    import { modalObject, modalShown } from '../../stores';

    export let object: BaseObject;
    export let pictureType: 'icon' | 'image' | 'both';
    export let quantity: number = null;
    export let hideName: boolean = false;
    export let importantWord: boolean = false;
    export let largerIcon: boolean = false;
</script>

<span
    on:click={() => {
        $modalObject = object;
        $modalShown = true;
    }}
    class:important-word={importantWord}
>
    {#if quantity}
        {quantity}&nbsp;
    {/if}
    {#if ['icon', 'both'].includes(pictureType)}
        <img
            class="img-fluid text-sized-image"
            class:larger-text-sized-image={largerIcon}
            src={object.url.icon}
            alt={object.labels.en}
        />
    {/if}
    {#if ['image', 'both'].includes(pictureType)}
        <img
            class="img-fluid text-sized-image"
            class:larger-text-sized-image={largerIcon}
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
</span>

<style>
    span {
        cursor: pointer;
        white-space: nowrap;
    }
    .text-sized-image {
        width: 1em;
    }
    .larger-text-sized-image {
        width: 2em;
    }
    .label {
        text-transform: capitalize;
    }
</style>

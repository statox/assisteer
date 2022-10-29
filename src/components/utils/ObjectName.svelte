<script lang="ts">
    import type { BaseObject } from '../../services/data/objects';
    import { modalObject, modalShown } from '../../stores';

    export let object: BaseObject;
    export let pictureType: 'icon' | 'image';
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
    <img
        class="img-fluid text-sized-image"
        class:larger-text-sized-image={largerIcon}
        src={object.url[pictureType]}
        alt={object.labels.en}
    />
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

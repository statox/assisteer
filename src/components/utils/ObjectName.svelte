<script lang="ts">
    import type { BaseObject } from '../../services/data/objects';
    import { objectSelectionModalShow, updateModalObject } from '../../stores';

    export let object: BaseObject;
    export let pictureType: 'icon' | 'image' | 'both';
    export let quantity: number = null;
    export let hideName: boolean = false;
    export let importantWord: boolean = false;
    export let pictureSize: 'default' | 'large' | 'larger' = 'default';
</script>

<span
    on:click={() => {
        updateModalObject(object);
        $objectSelectionModalShow = true;
    }}
    class:important-word={importantWord}
>
    {#if quantity}
        {quantity}&nbsp;
    {/if}
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
</span>

<style>
    span {
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
</style>

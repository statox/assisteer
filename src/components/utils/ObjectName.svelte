<script lang="ts">
    import type { BaseObject } from "../../services/data/objects";

    export let object: BaseObject;
    export let pictureType: "icon" | "image";
    export let quantity: number = null;
    export let hideName: boolean = false;
    export let importantWord: boolean = false;
    export let largerIcon: boolean = false;
</script>

<span class:important-word={importantWord}>
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
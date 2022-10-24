<script lang="ts">
    import { onMount } from 'svelte';

    import type { BaseObject } from '../../services/data/objects';

    export let object: BaseObject;
    export let pictureType: 'icon' | 'image';
    export let quantity: number = null;
    export let hideName: boolean = false;
    export let importantWord: boolean = false;
    export let largerIcon: boolean = false;
    export let disableOpenModal: boolean = false;

    onMount(() => {
        // In the case where the ObjectName is clicked from the ObjectSelection modal
        // we need to disable the attributes which toggle the modal
        if (disableOpenModal) {
            const element = document.getElementById(object.id + '-span');
            element.removeAttribute('data-bs-toggle');
            element.removeAttribute('data-bs-target');
            element.removeAttribute('data-bs-object');
        }
    });
</script>

<span
    data-bs-toggle="modal"
    data-bs-target="#inventoryModal"
    data-bs-object={object.id}
    class:important-word={importantWord}
    id={object.id + '-span'}
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

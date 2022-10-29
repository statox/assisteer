<script lang="ts">
    import { modalObject, modalShown } from '../../../stores';
    import { nextModalObject, prevModalObject, updateModalObject } from '../../../stores/modal';
    import ObjectDetails from '../objectDetails/ObjectDetails.svelte';
    import ObjectSearch from './ObjectSearch.svelte';

    export let onClosed: () => void = undefined;

    const selectObject = (event: any) => {
        updateModalObject(event.detail);
    };

    const modalClose = () => {
        $modalShown = false;
        if (onClosed) {
            onClosed();
        }
    };
    const onKeyDown = (e: any) => {
        const ESCAPE = 27;
        if (e.keyCode == ESCAPE) {
            modalClose();
        }
    };
</script>

{#if $modalShown}
    <div
        class="modal modal-xl"
        id="inventoryModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="inventoryModalLabel"
        aria-hidden="true"
        on:keydown={onKeyDown}
    >
        <div class="modal-dialog modal-fullscreen-lg-down" style="z-index: 11">
            <div class="modal-content">
                <div class="modal-header d-flex">
                    <h1 class="modal-title fs-5 me-1" id="inventoryModalLabel">
                        <span class="bi bi-card-list important-word" />
                        Object selection
                    </h1>

                    <button type="button" class="me-1" aria-label="Previous object" on:click={prevModalObject}>
                        <span class="bi bi-arrow-counterclockwise" />
                    </button>
                    <button type="button" data-dismiss="Next object" on:click={nextModalObject}>
                        <span class="bi bi-arrow-clockwise" />
                    </button>

                    <button
                        type="button"
                        class="close ms-auto"
                        data-dismiss="modal"
                        aria-label="Close"
                        on:click={modalClose}
                    >
                        <span class="bi bi-x-lg" />
                    </button>
                </div>
                <div class="modal-body">
                    <div class="content-section">
                        <ObjectSearch object={$modalObject} on:selectObject={selectObject} />
                        {#if $modalObject}
                            <ObjectDetails object={$modalObject} />
                        {:else}
                            <span>Select an object</span>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
        <div style="z-index: 9" class="modal-backdrop show" on:click={modalClose} />
    </div>
{/if}

<style>
    .modal {
        display: block;
    }
    .modal-body {
        background-color: var(--main-bg-color);
        color: var(--main-color);
    }
</style>

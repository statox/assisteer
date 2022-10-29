<script lang="ts">
    import { modalObject, modalShown } from '../../../stores';
    import ObjectDetails from '../objectDetails/ObjectDetails.svelte';
    import ObjectSearch from './ObjectSearch.svelte';

    export let onClosed: () => void = undefined;

    const selectObject = (event: any) => {
        $modalObject = event.detail;
    };

    const modalClose = () => {
        $modalShown = false;
        if (onClosed) {
            onClosed();
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
    >
        <div class="modal-dialog modal-fullscreen-lg-down" style="z-index: 11">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="inventoryModalLabel">
                        <button data-toggle="tooltip" data-placement="top" title="Object selection">
                            <span class="bi bi-card-list" />
                        </button>
                        Object selection
                    </h1>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={modalClose}>
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

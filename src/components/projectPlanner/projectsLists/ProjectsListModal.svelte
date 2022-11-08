<script lang="ts">
    import { projectListModalShow } from '../../../stores';
    import ProjectObjectsList from '../inventory/ProjectObjectsList.svelte';
    import ObjectSelectionButton from '../utils/buttons/ObjectSelectionButton.svelte';
    import ProjectsList from './ProjectsList.svelte';

    export let onClosed: () => void = undefined;

    const modalClose = () => {
        $projectListModalShow = false;
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

{#if $projectListModalShow}
    <div
        class="modal modal-xl"
        id="projectInventoryModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="projectInventoryModalLabel"
        aria-hidden="true"
        on:keydown={onKeyDown}
    >
        <div class="modal-dialog modal-fullscreen-lg-down" style="z-index: 11">
            <div class="modal-content">
                <div class="modal-header d-flex">
                    <h1 class="modal-title fs-5 me-1" id="inventoryModalLabel">
                        <span class="bi bi-list-ul important-word" />
                        Projects List
                    </h1>

                    <span class="ms-auto">
                        <ObjectSelectionButton />
                    </span>
                    <button
                        type="button"
                        class="close ms-1"
                        data-dismiss="modal"
                        aria-label="Close"
                        on:click={modalClose}
                    >
                        <span class="bi bi-x-lg" />
                    </button>
                </div>
                <div class="modal-body">
                    <ProjectsList />
                    <ProjectObjectsList />
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

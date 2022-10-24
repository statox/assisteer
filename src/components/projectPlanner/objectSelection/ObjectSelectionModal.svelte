<script lang="ts">
    import { onMount } from 'svelte';
    import { BaseObject, getObject } from '../../../services/data/objects';

    import ObjectSelection from './ObjectSelection.svelte';
    let object: BaseObject;

    onMount(() => {
        const modal = document.getElementById('inventoryModal');
        modal.addEventListener('show.bs.modal', (event: any) => {
            // Button that triggered the modal
            const button = event.relatedTarget;
            // Extract info from data-bs-* attributes
            const objectId = button.getAttribute('data-bs-object');

            if (objectId) {
                object = getObject(objectId);
            }
        });
    });
</script>

<!-- Use the following properties to show the modal -->
<!-- <span data-bs-toggle="modal" data-bs-target="#inventoryModal">Inventory modal </span> -->

<div
    class="modal modal-xl fade"
    id="inventoryModal"
    tabindex="-1"
    aria-labelledby="inventoryModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog modal-fullscreen-lg-down">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="inventoryModalLabel">Project Inventory</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div class="modal-body">
                <ObjectSelection {object} />
            </div>
        </div>
    </div>
</div>

<style>
    .modal-body {
        background-color: var(--main-bg-color);
        color: var(--main-color);
    }
</style>

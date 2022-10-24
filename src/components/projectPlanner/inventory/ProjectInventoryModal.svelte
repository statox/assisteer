<script lang="ts">
    import ProjectInventory from './ProjectInventory.svelte';
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
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="inventoryModalLabel">Project Inventory</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div class="modal-body">
                <ProjectInventory />
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

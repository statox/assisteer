<script lang="ts">
    import type { BaseObject } from '../../../services/data/objects';
    import { getObjectStorageDetails, StorageDetails } from '../../../services/data/storage';

    export let object: BaseObject;
    let storageDetails: StorageDetails;

    // Reactive declaration: The code runs on props change
    $: {
        (() => {
            if (!object) {
                return;
            }
            storageDetails = getObjectStorageDetails(object.id);
        })();
    }
</script>

<main>
    {#if storageDetails}
        <div class="d-flex flex-wrap row justify-content-between">
            <h5 class="content-subheader">Storage</h5>
            {#if storageDetails.slotsByTier[1] > 0}
                <div class="d-flex justify-content-between">
                    <span class="important-word"> Small slots </span>
                    {storageDetails.slotsByTier[1]}
                </div>
            {/if}

            {#if storageDetails.slotsByTier[2] > 0}
                <div class="d-flex justify-content-between">
                    <span class="important-word"> Medium slots </span>
                    {storageDetails.slotsByTier[2]}
                </div>
            {/if}

            {#if storageDetails.slotsByTier[3] > 0}
                <div class="d-flex justify-content-between">
                    <span class="important-word"> Large slots </span>
                    {storageDetails.slotsByTier[3]}
                </div>
            {/if}

            {#if storageDetails.slotsByTier[4] > 0}
                <div class="d-flex justify-content-between">
                    <span class="important-word"> XL slots </span>
                    {storageDetails.slotsByTier[4]}
                </div>
            {/if}
        </div>
    {/if}
</main>

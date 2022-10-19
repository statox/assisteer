<script lang="ts">
    import type { BaseObject } from '../../../services/data/objects';
    import { getObjectCanisterDetails, CanisterDetails } from '../../../services/data/storage';

    export let object: BaseObject;
    let canisterDetails: CanisterDetails;

    const typeLabels = {
        fluid_soil: {
            en: 'Fluids & Soil'
        },
        resources: {
            en: 'Resources'
        },
        gases: {
            en: 'Gases'
        }
    };

    // Reactive declaration: The code runs on props change
    $: {
        (() => {
            if (!object) {
                return;
            }
            canisterDetails = getObjectCanisterDetails(object.id);
        })();
    }
</script>

<main>
    {#if canisterDetails}
        <div class="d-flex flex-wrap row justify-content-between">
            <h5 class="content-subheader">Canister</h5>
            <div class="d-flex justify-content-between">
                <span class="important-word">Canister type</span>
                {typeLabels[canisterDetails.holds].en}
            </div>

            <div class="d-flex justify-content-between">
                <span class="important-word">Capacity</span>
                {canisterDetails.capacity}
            </div>
        </div>
    {/if}
</main>

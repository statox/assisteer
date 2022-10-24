<script lang="ts">
    import ObjectSelection from './ObjectSelection.svelte';
    import ObjectDetails from '../objectDetails/ObjectDetails.svelte';
    import type { BaseObject } from '../../../services/data/objects';

    export let object: BaseObject;

    const selectObject = (event: any) => {
        object = event.detail;
    };
</script>

<main>
    <div class="content-section">
        <ObjectSelection {object} on:selectObject={selectObject} />
        <ObjectDetails {object} />
    </div>
</main>

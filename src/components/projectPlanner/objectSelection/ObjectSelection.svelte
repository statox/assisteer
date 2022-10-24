<script lang="ts">
    import ObjectSearch from './ObjectSearch.svelte';
    import ObjectDetails from '../objectDetails/ObjectDetails.svelte';
    import type { BaseObject } from '../../../services/data/objects';

    export let object: BaseObject;

    const selectObject = (event: any) => {
        object = event.detail;
    };
</script>

<main>
    <div class="content-section">
        <ObjectSearch {object} on:selectObject={selectObject} />
        <ObjectDetails {object} />
    </div>
</main>

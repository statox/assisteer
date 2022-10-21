<script lang="ts">
    import type { BaseObject } from '../../../services/data/objects';
    import { AtmosphericResourceLocations, getAlmosphericResourceLocation } from '../../../services/data/resources';
    import ItemName from '../../utils/ItemName.svelte';

    export let resource: BaseObject;
    let locations: AtmosphericResourceLocations;

    // Reactive declaration: The code runs on props change
    $: {
        (() => {
            if (!resource) {
                return;
            }
            locations = getAlmosphericResourceLocation(resource.id).sort((a, b) => {
                return b.density - a.density;
            });
        })();
    }
</script>

<main class="container">
    <h4 class="content-subheader">Location details</h4>
    <div class="row">
        {#if !location}
            <span>Error couldn't find {resource.id} location information</span>
        {:else}
            {#each locations as location}
                <div class="d-flex justify-content-between">
                    <ItemName item={location.planet} pictureType={'icon'} />
                    <span>{location.density}&nbsp;ppm</span>
                </div>
            {/each}
        {/if}
    </div>
</main>

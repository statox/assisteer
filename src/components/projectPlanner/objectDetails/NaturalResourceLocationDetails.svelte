<script lang="ts">
    import type { BaseObject } from '../../../services/data/objects';
    import { getNaturalResourceLocation, NaturalResourceLocation } from '../../../services/data/resources';
    import ItemName from '../../utils/ItemName.svelte';

    export let resource: BaseObject;
    let location: NaturalResourceLocation;

    // Reactive declaration: The code runs on props change
    $: {
        (() => {
            if (!resource) {
                return;
            }
            location = getNaturalResourceLocation(resource.id);
        })();
    }
</script>

<main class="container">
    <h4 class="content-subheader">Location details</h4>
    <div class="row">
        {#if !location}
            <span>Available on all planets</span>
        {:else}
            {#each ['primary', 'secondary'] as locationType}
                <div class="d-flex">
                    <ItemName item={location[locationType].planet} pictureType={'icon'} />
                    <span><i>&nbsp;({locationType})</i></span>
                    <span class="ms-auto">{location[locationType].description}</span>
                </div>
            {/each}
        {/if}
    </div>
</main>

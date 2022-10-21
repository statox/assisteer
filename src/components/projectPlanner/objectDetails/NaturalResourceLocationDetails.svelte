<script lang="ts">
    import type { BaseObject } from '../../../services/data/objects';
    import { getNaturalResourceLocation, NaturalResourceLocation } from '../../../services/data/resources';
    import PlanetName from '../../utils/PlanetName.svelte';

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
                <div class="col">
                    <h4 class="content-subheader">{locationType}</h4>
                    <div>
                        <PlanetName planet={location[locationType].planet} pictureType={'icon'} />
                    </div>
                    <div>
                        <img
                            class="img-fluid text-sized-image"
                            src={location[locationType].planet.url.image}
                            alt={location[locationType].planet.labels.en}
                        />
                    </div>
                    <div>
                        <span>
                            {location[locationType].description}
                        </span>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</main>

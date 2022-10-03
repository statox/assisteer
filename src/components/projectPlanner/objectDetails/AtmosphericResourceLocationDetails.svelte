<script lang="ts">
    import type { BaseObject } from "../../../services/data/objects";
    import {
        AtmosphericResourceLocations,
        getAlmosphericResourceLocation,
    } from "../../../services/data/resources";

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
                <div>
                    <span class="important-word">{location.planet.labels.en}</span>
                    <img
                        class="img-fluid small-image"
                        src={location.planet.url.icon}
                        alt={location.planet.labels.en}
                    />

                    {location.density}&nbsp;ppm
                </div>
            {/each}
        {/if}
    </div>
</main>

<style>
    .small-image {
        height: 1em;
    }
</style>

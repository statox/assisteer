<script lang="ts">
    import type { BaseObject } from "../../../services/data/objects";
    import { getPlanet, Planet } from "../../../services/data/planets";
    import {
        getResourceDetails,
        ResourceDetails,
    } from "../../../services/data/resources";

    export let resource: BaseObject;
    let resourceDetails: ResourceDetails;
    let planets: { primary: Planet; secondary: Planet };

    // Reactive declaration: The code runs on props change
    $: {
        (() => {
            if (!resource) {
                return;
            }
            resourceDetails = getResourceDetails(resource.id);
            planets = null;
            if (resourceDetails.location) {
                planets = {
                    primary: getPlanet(resourceDetails.location.primary.planet),
                    secondary: getPlanet(
                        resourceDetails.location.secondary.planet
                    ),
                };
            }
        })();
    }
</script>

<main class="container">
    <h4 class="content-subheader">Location details</h4>
    <div class="row">
        {#if !resourceDetails.location}
            <span>Available on all planets</span>
        {:else}
            {#each ["primary", "secondary"] as locationType}
                <div class="col">
                    <h4 class="content-subheader">{locationType}</h4>
                    <div>
                        <span class="important-word">
                            {planets[locationType].labels.en}
                        </span>

                        <img
                            class="img-fluid small-image"
                            src={planets[locationType].url.icon}
                            alt={planets[locationType].labels.en}
                        />
                    </div>
                    <div>
                        <img
                            class="img-fluid text-sized-image"
                            src={planets[locationType].url.image}
                            alt={planets[locationType].labels.en}
                        />
                    </div>
                    <div>
                        <span>
                            {resourceDetails.location[locationType].description}
                        </span>
                    </div>
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

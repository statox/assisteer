<script lang="ts">
    import type { BaseObject } from "../../../services/data/objects";
    // import { getPlanet, Planet } from "../../../services/data/planets";
    // import {
    //     getResourceDetails,
    //     ResourceDetails,
    // } from "../../../services/data/resources";

    export let resource: BaseObject;
    // let resourceDetails: ResourceDetails;
    // let planets: { primary: Planet; secondary: Planet };

    // Reactive declaration: The code runs on props change
    // $: {
    //     (() => {
    //         if (!resource) {
    //             return;
    //         }
    //         resourceDetails = getResourceDetails(resource.id);
    //         planets = null;
    //         if (resourceDetails.location) {
    //             planets = {
    //                 primary: getPlanet(resourceDetails.location.primary.planet),
    //                 secondary: getPlanet(
    //                     resourceDetails.location.secondary.planet
    //                 ),
    //             };
    //         }
    //     })();
    // }
</script>

<main class="container">
    <h4 class="content-subheader">Location details</h4>
    <div class="row">
        Atmospheric resource {resource.id}
    </div>
</main>

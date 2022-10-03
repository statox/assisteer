<script lang="ts">
    import { afterUpdate } from "svelte";
    import { getObject } from "../../../services/data/objects";
    import { getAlmosphericResourceLocation } from "../../../services/data/resources";
    import { alphaSort } from "../../../services/utils";
    import { settings } from "../../../stores";

    export let categoryName: string;
    export let categoryItems: any;
    let totalResourcesInCategory = 0;

    afterUpdate(() => {
        totalResourcesInCategory = 0;
        for (const objectName of Object.keys(categoryItems)) {
            totalResourcesInCategory += categoryItems[objectName];
        }
    });
</script>

<main>
    <h4 class="content-subheader">
        {categoryName} ({totalResourcesInCategory})
    </h4>
    <div class="container">
        <div class="row">
            <div class="col text-align-center">
                <ul>
                    {#each Object.keys(categoryItems).sort(alphaSort) as objectName}
                        <li>
                            <span>
                                <b>{categoryItems[objectName]}</b>
                                &nbsp;<img
                                    class="resource-icon"
                                    src={getObject(objectName).url[$settings.pictureType]}
                                    alt={getObject(objectName).labels.en}
                                />
                                &nbsp;{objectName}
                            </span>
                            {#if getObject(objectName).category === "atmospheric"}
                                <span>
                                    {#each getAlmosphericResourceLocation(objectName) || [] as location}
                                        <img
                                            class="planet-icon rounded-circle"
                                            src={location.planet.url[
                                                $settings.pictureType
                                            ]}
                                            alt={location.planet.labels.en}
                                            data-toggle="tooltip" data-placement="top" title={location.planet.labels.en}
                                        />
                                    {/each}
                                </span>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</main>

<style>
    ul {
        list-style-type: none;
        text-align: left;
        display: inline-block;
    }
    .resource-icon {
        width: 2em;
    }
    .planet-icon {
        width: 1.3em;
    }
    .text-align-center {
        text-align: center;
    }
</style>

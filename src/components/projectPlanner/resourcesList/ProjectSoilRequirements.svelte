<script lang="ts">
    import { settings } from "../../../stores";
    import { getObject } from "../../../services/data/objects";
    import { getResourcesSoilRequirements, ProjectLightResourcesByCategory, SoilRequirements } from "../../../services/project";
    import { alphaSort } from "../../../services/utils";

    export let resourcesList: ProjectLightResourcesByCategory;
    let soilRequirements: SoilRequirements;
    let collapsed = false;

    $: {
        soilRequirements = getResourcesSoilRequirements(resourcesList);
    }
</script>

<main class:hidden={!soilRequirements || soilRequirements.total === 0}>
    <h4 class="content-subheader">
        Soil requirements
    </h4>
    <div class="row" class:hidden={collapsed === true}>
        <div class="col">
            <ul>
                <li>
                    <span class="important-word">Total soil&nbsp;</span>{soilRequirements.total}
                </li>
                {#each Object.keys(soilRequirements.byResource).sort(alphaSort) as resourceName}
                <li>
                    {soilRequirements.byResource[resourceName].soilRequired}&nbsp;
                    for&nbsp;{soilRequirements.byResource[resourceName].quantityProduced}
                    <img
                        class="resource-icon"
                        src={getObject(resourceName).url[$settings.pictureType]}
                        alt={getObject(resourceName).labels.en}
                    />
                    &nbsp;{resourceName}
                    {#if soilRequirements.byResource[resourceName].surplus > 0}
                        &nbsp;(Surplus: {soilRequirements.byResource[resourceName].surplus})
                    {/if}
                </li>
                {/each}
            </ul>
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
</style>

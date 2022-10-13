<script lang="ts">
    import { settings, project } from "../../stores";
    import { getObject } from "../../services/data/objects";
    import { getProjectResourcesByCategories, getResourcesScrapRequirement, getResourcesSoilRequirements, ProjectLightResourcesByCategory, ScrapRequirements, SoilRequirements } from "../../services/project";
    import { alphaSort } from "../../services/utils";

    const soil = getObject('soil');
    const scrap = getObject('scrap');
    let resourcesList: ProjectLightResourcesByCategory;
    let soilRequirements: SoilRequirements;
    let scrapRequirements: ScrapRequirements;
    let collapsed = false;

    $: {
        resourcesList = getProjectResourcesByCategories($project);
        soilRequirements = getResourcesSoilRequirements(resourcesList);
        scrapRequirements = getResourcesScrapRequirement(resourcesList);
    }
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
            Scrap & Soil Requirements
        </h3>
        <div class="row" class:hidden={collapsed === true || soilRequirements.total !== 0 || scrapRequirements.total !== 0}>
            <p>Nothing to show. Add objects to the project in the Inventory section.
        </div>
        <div class="row" class:hidden={collapsed === true || (soilRequirements.total === 0 && scrapRequirements.total === 0)}>
            <div class="col-xs-12 col-sm-6">
                <h4 class="content-subheader">
                    Soil requirements
                    <img
                        class="resource-icon"
                        src={soil.url[$settings.pictureType]}
                        alt={soil.labels.en}
                    />
                </h4>
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

            <div class="col">
                <h4 class="content-subheader">
                    Scrap requirements
                    <img
                        class="resource-icon"
                        src={scrap.url[$settings.pictureType]}
                        alt={scrap.labels.en}
                    />
                </h4>
                <ul>
                    <li>
                        <span class="important-word">Total scrap&nbsp;</span>{scrapRequirements.total}
                    </li>
                    {#each Object.keys(scrapRequirements.byResource).sort(alphaSort) as resourceName}
                        <li>
                            {scrapRequirements.byResource[resourceName].scrapRequired}&nbsp;
                            for&nbsp;{scrapRequirements.byResource[resourceName].quantityProduced}
                            <img
                                class="resource-icon"
                                src={getObject(resourceName).url[$settings.pictureType]}
                                alt={getObject(resourceName).labels.en}
                            />
                            &nbsp;{resourceName}
                            {#if scrapRequirements.byResource[resourceName].surplus > 0}
                                &nbsp;(Surplus: {scrapRequirements.byResource[resourceName].surplus})
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
</style>

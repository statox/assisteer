<script lang="ts">
    import { afterUpdate } from "svelte";
    import {
        getProjectResourcesByCategories,
        ProjectLightResourcesByCategory,
    } from "../../../services/project";
    import { project } from "../../../stores";
    import ProjectResourcesListCategory from "./ProjectResourcesListCategory.svelte";
    import ProjectResourcesListCategoryWithSubCategories from "./ProjectResourcesListCategoryWithSubCategories.svelte";

    let collapsed = false;

    const favoriteCategoriesOrder = {
        special_resource: 1,
        atmospheric: 2,
        natural: 3,
        refined: 4,
        composite: 5,
    };

    let resourcesList: ProjectLightResourcesByCategory;
    let sortedCategories = [];

    afterUpdate(() => {
        if (!$project) {
            return;
        }
        resourcesList = getProjectResourcesByCategories($project);

        sortedCategories = Object.keys(resourcesList).sort((a, b) => {
            const favOrderA = favoriteCategoriesOrder[a];
            const favOrderB = favoriteCategoriesOrder[b];

            // Simple alphabetical sort
            if (!favOrderA && !favOrderB) {
                return a < b ? -1 : 1;
            }

            if (!favOrderA) {
                return 1;
            }

            if (!favOrderB) {
                return -1;
            }

            return favOrderA - favOrderB;
        });
    });
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
            Resource list
        </h3>
        <div class:hidden={collapsed === true}>
            {#if sortedCategories.length === 0}
                <p>Nothing to show. Add objects to the project in the Inventory section.</p>
            {/if}
            <div class="row">
                {#if sortedCategories.includes("special_resource")}
                    <div class="col-sm-12 col-md-6">
                        <ProjectResourcesListCategory
                            categoryName={"special_resource"}
                            categoryItems={resourcesList.special_resource}
                        />
                    </div>
                {/if}
                {#if sortedCategories.includes("atmospheric")}
                    <div class="col-sm-12 col-md-6">
                        <ProjectResourcesListCategory
                            categoryName={"atmospheric"}
                            categoryItems={resourcesList.atmospheric}
                        />
                    </div>
                {/if}
                {#if sortedCategories.includes("natural")}
                    <div class="col-xs-12">
                        <ProjectResourcesListCategoryWithSubCategories
                            categoryName={"natural"}
                            categoryItems={resourcesList.natural}
                        />
                    </div>
                {/if}
                {#if sortedCategories.includes("refined")}
                    <div class="col-sm-12 col-md-6">
                        <ProjectResourcesListCategoryWithSubCategories
                            categoryName={"refined"}
                            categoryItems={resourcesList.refined}
                        />
                    </div>
                {/if}
                {#if sortedCategories.includes("composite")}
                    <div class="col-sm-12 col-md-6">
                        <ProjectResourcesListCategory
                            categoryName={"composite"}
                            categoryItems={resourcesList.composite}
                        />
                    </div>
                {/if}
            </div>
        </div>
    </div>
</main>

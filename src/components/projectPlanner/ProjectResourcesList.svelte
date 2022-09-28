<script lang="ts">
    import { afterUpdate } from "svelte";
    import {
        getProjectItemsByResourceCategoriesAndTiers,
        ResourceList,
    } from "../../services/project";
    import { project } from "../../stores";
    import ProjectResourcesListCategory from "./ProjectResourcesListCategory.svelte";
    import ProjectResourcesListCategoryWithSubCategories from "./ProjectResourcesListCategoryWithSubCategories.svelte";
    export let pictureType: "icon" | "image" = "image";

    let collapsed = false;

    const favoriteCategoriesOrder = {
        special_resource: 1,
        atmospheric: 2,
        natural: 3,
        refined: 4,
        composite: 5,
        tier_1: 6,
        tier_2: 7,
        tier_3: 8,
        tier_4: 9,
    };

    let resourcesList: ResourceList = {};
    let sortedCategories = [];

    afterUpdate(() => {
        if (!$project) {
            return;
        }
        resourcesList = getProjectItemsByResourceCategoriesAndTiers($project);

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
    <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
        Resource list
    </h3>
    <div class:hidden={collapsed === true}>
        {#each sortedCategories as category}
            {#if ["natural", "refined"].includes(category)}
                <ProjectResourcesListCategoryWithSubCategories
                    {pictureType}
                    categoryName={category}
                    categoryItems={resourcesList[category]}
                />
            {:else}
                <ProjectResourcesListCategory
                    {pictureType}
                    categoryName={category}
                    categoryItems={resourcesList[category]}
                />
            {/if}
        {/each}
    </div>
</main>

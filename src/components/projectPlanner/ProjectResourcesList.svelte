<script lang="ts">
    import { afterUpdate } from "svelte";
    import { getObject } from "../../services/data/objects";
    import {
        getProjectResourcesList,
        Project,
        ResourceList,
    } from "../../services/project";
    export let project: Project;

    const favoriteCategoriesOrder = {
        "special_resource": 1,
        atmospheric: 2,
        natural: 3,
        refined: 4,
        composite: 5,
    };
    let resourcesList: ResourceList = {};
    let sortedCategories = [];

    const alphaSort = (a: string, b: string) => a < b ? -1 : 1;

    afterUpdate(() => {
        if (!project) {
            return;
        }
        resourcesList = getProjectResourcesList(project);

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
    <div>
        <h3 class="content-header">Resource list</h3>
        {#each sortedCategories as category}
            <div>
                <h4 class="content-subheader">{category}</h4>
                <ul>
                    {#each Object.keys(resourcesList[category]).sort(alphaSort) as objectName}
                        <li>
                            <span>
                                <b>{resourcesList[category][objectName]}</b>
                                &nbsp;{objectName}
                                &nbsp;<img
                                    class="resource-icon"
                                    src={getObject(objectName).url.image}
                                    alt={getObject(objectName).labels.en}
                                />
                            </span>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
</main>

<style>
    ul {
        list-style-type: none;
    }
    .resource-icon {
        width: 3em;
    }
</style>

<script lang="ts">
    import { afterUpdate } from "svelte";
    import { getObject } from "../../services/data/objects";
    import { getResourceDetails } from "../../services/data/resources";

    export let categoryName: string;
    export let categoryItems: any;
    export let pictureType: "icon" | "image" = "image";
    let sortedItems: any = {};
    let totalResourcesInCategory = 0;

    const favoriteSubCategoriesOrder = ["organic", "mineral", "ore", "metal"];

    const subCatSort = (a: string, b: string) =>
        favoriteSubCategoriesOrder.indexOf(a) -
        favoriteSubCategoriesOrder.indexOf(b);
    const alphaSort = (a: string, b: string) => (a < b ? -1 : 1);

    afterUpdate(() => {
        sortedItems = {};
        totalResourcesInCategory = 0;
        for (const objectName of Object.keys(categoryItems)) {
            const details = getResourceDetails(objectName);
            if (!details || !details.classification) {
            }
            if (!sortedItems[details.classification]) {
                sortedItems[details.classification] = {};
            }
            sortedItems[details.classification][objectName] =
                categoryItems[objectName];

            totalResourcesInCategory += categoryItems[objectName];
        }
    });
</script>

<main>
    <h4 class="content-subheader">{categoryName} ({totalResourcesInCategory})</h4>
    <div class="container row">
        {#each Object.keys(sortedItems).sort(subCatSort) as classification}
            <div class="col text-align-center">
                <ul>
                    {#each Object.keys(sortedItems[classification]).sort(alphaSort) as objectName}
                        <li>
                            <span>
                                <b>{categoryItems[objectName]}</b>
                                &nbsp;<img
                                    class="resource-icon"
                                    src={getObject(objectName).url[pictureType]}
                                    alt={getObject(objectName).labels.en}
                                />
                                &nbsp;{objectName}
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
        text-align: left;
        display: inline-block;
    }
    .resource-icon {
        width: 2em;
    }
    .text-align-center {
        text-align: center;
    }
</style>

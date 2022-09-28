<script lang="ts">
    import { afterUpdate } from "svelte";
    import { getObject } from "../../services/data/objects";
    import { getResourceDetails } from "../../services/data/resources";

    export let categoryName: string;
    export let categoryItems: any;
    export let pictureType: "icon" | "image" = "image";
    let sortedItems: any = {};

    const favoriteSubCategoriesOrder = ["organic", "mineral", "ore", "metal"];

    const subCatSort = (a: string, b: string) =>
        favoriteSubCategoriesOrder.indexOf(a) -
        favoriteSubCategoriesOrder.indexOf(b);
    const alphaSort = (a: string, b: string) => (a < b ? -1 : 1);

    afterUpdate(() => {
        sortedItems = {};
        for (const objectName of Object.keys(categoryItems)) {
            const details = getResourceDetails(objectName);
            if (!details || !details.classification) {
                console.error("can t find details of " + objectName);
                console.error(details);
            }
            if (!sortedItems[details.classification]) {
                sortedItems[details.classification] = {};
            }
            sortedItems[details.classification][objectName] =
                categoryItems[objectName];
        }
    });
</script>

<main>
    <h4 class="content-subheader">{categoryName}</h4>
    <div class="container row">
        {#each Object.keys(sortedItems).sort(subCatSort) as classification}
            <div class="col">
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
    }
    .resource-icon {
        width: 3em;
    }
</style>

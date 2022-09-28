<script lang="ts">
    import { afterUpdate } from "svelte";
    import { getObject } from "../../services/data/objects";

    export let pictureType: "icon" | "image" = "image";
    export let categoryName: string;
    export let categoryItems: any;
    let totalResourcesInCategory = 0;

    const alphaSort = (a: string, b: string) => (a < b ? -1 : 1);

    afterUpdate(() => {
        totalResourcesInCategory = 0;
        for (const objectName of Object.keys(categoryItems)) {
            totalResourcesInCategory += categoryItems[objectName];
        }
    });
</script>

<main>
    <h4 class="content-subheader">{categoryName} ({totalResourcesInCategory})</h4>
    <div class="container row">
        <div class="col text-align-center">
            <ul>
                {#each Object.keys(categoryItems).sort(alphaSort) as objectName}
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

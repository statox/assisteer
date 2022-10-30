<script lang="ts">
    import ObjectName from '../../utils/ObjectName.svelte';
    import { afterUpdate } from 'svelte';
    import { getObject } from '../../../services/data/objects';
    import { getResourceDetails } from '../../../services/data/resources';
    import { alphaSort } from '../../../services/utils';
    import { settings } from '../../../stores';

    export let categoryName: string;
    export let categoryItems: any;
    let sortedItems: any = {};
    let totalResourcesInCategory = 0;

    const favoriteSubCategoriesOrder = ['organic', 'mineral', 'ore', 'metal'];

    const subCatSort = (a: string, b: string) =>
        favoriteSubCategoriesOrder.indexOf(a) - favoriteSubCategoriesOrder.indexOf(b);

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
            sortedItems[details.classification][objectName] = categoryItems[objectName];

            totalResourcesInCategory += categoryItems[objectName];
        }
    });
</script>

<main>
    <h4 class="content-subheader">
        {categoryName} ({totalResourcesInCategory})
    </h4>
    <div class="container">
        <div class="d-flex flex-sm-row flex-column justify-content-evenly">
            {#each Object.keys(sortedItems).sort(subCatSort) as classification}
                <div class="flex-column text-align-center">
                    <ul>
                        {#each Object.keys(sortedItems[classification]).sort(alphaSort) as objectName}
                            {@const object = getObject(objectName)}
                            <li class="d-flex justify-content-between">
                                <ObjectName
                                    {object}
                                    quantity={categoryItems[objectName]}
                                    pictureType={$settings.pictureType}
                                    showPlanets={true}
                                />
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    ul {
        list-style-type: none;
        text-align: left;
        display: inline-block;
    }
    .text-align-center {
        text-align: center;
    }
</style>

<script lang="ts">
    import ObjectName from '../../utils/ObjectName.svelte';
    import { afterUpdate } from 'svelte';
    import { getObject } from '../../../services/data/objects';
    import { alphaSort } from '../../../services/utils';
    import { settings } from '../../../stores';

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
        </div>
    </div>
</main>

<style>
    ul {
        list-style-type: none;
        text-align: left;
        display: inline-block;
    }
</style>

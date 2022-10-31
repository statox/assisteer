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
    <div class="d-flex justify-content-start justify-content-md-around">
        <div class="flex-column text-align-center">
            {#each Object.keys(categoryItems).sort(alphaSort) as objectName}
                {@const object = getObject(objectName)}
                <ObjectName
                    {object}
                    quantity={categoryItems[objectName]}
                    pictureType={$settings.pictureType}
                    showPlanets={true}
                />
            {/each}
        </div>
    </div>
</main>

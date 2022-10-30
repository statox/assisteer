<script lang="ts">
    import ObjectName from '../../utils/ObjectName.svelte';
    import { afterUpdate } from 'svelte';
    import { getObject } from '../../../services/data/objects';
    import { getAlmosphericResourceLocation } from '../../../services/data/resources';
    import { alphaSort } from '../../../services/utils';
    import { settings } from '../../../stores';
    import ItemName from '../../utils/ItemName.svelte';

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
                            />
                            {#if object.category === 'atmospheric'}
                                <span>
                                    {#each getAlmosphericResourceLocation(objectName) || [] as location}
                                        <ItemName item={location.planet} pictureType={'icon'} hideName={true} />
                                    {/each}
                                </span>
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
    .text-align-center {
        text-align: center;
    }
</style>

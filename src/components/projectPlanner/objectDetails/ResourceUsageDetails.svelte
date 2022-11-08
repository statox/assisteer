<script lang="ts">
    import type { BaseObject } from '../../../services/data/objects';
    import { getResourceUsages, ResourceUsages } from '../../../services/dependencies';
    import { project } from '../../../stores';
    import ObjectName from '../../utils/ObjectName.svelte';

    export let object: BaseObject;
    let usages: ResourceUsages;

    const categoryLabels = {
        composite: 'Composite Resources',
        refined: 'Refined Resources',
        tier_1: 'Small Objects',
        tier_2: 'Medium Objects',
        tier_3: 'Large Objects',
        tier_4: 'XL Objects'
    };

    $: {
        (() => {
            if (!object || object.type !== 'resource') {
                return;
            }
            usages = getResourceUsages(object.id);
        })();
    }
</script>

<div class="d-flex flex-wrap row justify-content-between">
    <h5 class="content-subheader">Usages</h5>
    {#if !usages}
        <span>No usages found.</span>
    {/if}
    {#each ['refined', 'composite', 'tier_1', 'tier_2', 'tier_3', 'tier_4'] as category}
        {#if usages && usages[category]}
            <div>
                <span class="important-word">{categoryLabels[category]}</span>
                <ul>
                    {#each usages[category] as producedObject}
                        <li>
                            <ObjectName
                                classes={Object.keys($project.objects).includes(producedObject.id) ? ['green'] : []}
                                object={producedObject}
                                pictureType={'icon'}
                            />
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    {/each}
</div>

<style>
    ul {
        list-style-type: none;
    }
</style>

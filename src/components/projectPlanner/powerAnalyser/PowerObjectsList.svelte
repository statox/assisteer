<script lang="ts">
    import type { ProjectPowerStats } from '../../../services/data/power';
    import { updateObjectQuantityInProject } from '../../../services/project';

    import { objectSelectionModalShow, project } from '../../../stores';
    import ObjectName from '../../utils/ObjectName.svelte';
    import QuantitySelector from '../inventory/QuantitySelector.svelte';
    import ObjectSelectionButton from '../utils/buttons/ObjectSelectionButton.svelte';

    export let projectData: ProjectPowerStats;
</script>

<div class="table-responsive">
    <div>
        <ObjectSelectionButton showName={true} />
    </div>

    <table class="table table-borderless">
        <tbody>
            {#if projectData['producer'].total > 0}
                <tr>
                    <td colspan="4"><h4 class="content-subheader">Power Production</h4></td>
                </tr>
                <tr>
                    <td />
                    <td class="small-header">By object</td>
                    <td class="small-header">By type</td>
                    <td />
                </tr>
                {#each projectData['producer'].items as item}
                    <tr>
                        <td>
                            <ObjectName object={item.object} pictureType="icon" importantWord={true} />
                        </td>
                        <!-- this is here for typeguard -->
                        {#if item.powerStats.type === 'producer'}
                            <td>
                                {item.quantity} x {item.powerStats.output} U/s
                            </td>
                            <td>
                                {item.quantity * item.powerStats.output} U/s
                            </td>
                        {/if}
                        <td>
                            <QuantitySelector
                                objectId={item.object.id}
                                quantity={$project.objects[item.object.id]}
                                changeQuantityFn={(params) =>
                                    ($project = updateObjectQuantityInProject($project, {
                                        op: params.op,
                                        objectId: params.objectName
                                    }))}
                            />
                        </td>
                    </tr>
                {/each}
            {/if}
            {#if projectData['storage'].totalCapacity > 0}
                <tr>
                    <td colspan="4"><h4 class="content-subheader">Power Storage</h4></td>
                </tr>
                <tr>
                    <td />
                    <td class="small-header">By object</td>
                    <td class="small-header">By type</td>
                    <td />
                </tr>
                {#each projectData['storage'].items as item}
                    <tr>
                        <td>
                            <ObjectName object={item.object} pictureType="icon" importantWord={true} />
                        </td>
                        <!-- this is here for typeguard -->
                        {#if item.powerStats.type === 'storage'}
                            <td>
                                {item.quantity} x {item.powerStats.capacity} U
                            </td>
                            <td>
                                {item.quantity * item.powerStats.capacity} U
                            </td>
                        {/if}
                        <td>
                            <QuantitySelector
                                objectId={item.object.id}
                                quantity={$project.objects[item.object.id]}
                                changeQuantityFn={(params) =>
                                    ($project = updateObjectQuantityInProject($project, {
                                        op: params.op,
                                        objectId: params.objectName
                                    }))}
                            />
                        </td>
                    </tr>
                {/each}
            {/if}
            {#if projectData['consumer'].total > 0}
                <tr>
                    <td colspan="4"><h4 class="content-subheader">Power Consumption</h4></td>
                </tr>
                <tr>
                    <td />
                    <td class="small-header">By object</td>
                    <td class="small-header">By type</td>
                    <td />
                </tr>
                {#each projectData['consumer'].items as item}
                    <tr>
                        <td>
                            <ObjectName object={item.object} pictureType="icon" importantWord={true} />
                        </td>
                        <!-- this is here for typeguard -->
                        {#if item.powerStats.type === 'consumer'}
                            <td>
                                {item.quantity} x {item.powerStats.input} U/s
                            </td>
                            <td>
                                {item.quantity * item.powerStats.input} U/s
                            </td>
                        {/if}
                        <td>
                            <QuantitySelector
                                objectId={item.object.id}
                                quantity={$project.objects[item.object.id]}
                                changeQuantityFn={(params) =>
                                    ($project = updateObjectQuantityInProject($project, {
                                        op: params.op,
                                        objectId: params.objectName
                                    }))}
                            />
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>

<style>
    .table-borderless tr {
        border: 0;
    }
    .small-header {
        font-size: 0.7em;
    }
</style>

<script lang="ts">
    import { afterUpdate } from 'svelte';
    import {
        ChangeQuantityFnParams,
        getProjectObjectsByCategory,
        getProjectObjectsByTier,
        getProjectTotalUnlockCost,
        ProjectObjectsByCategory,
        toggleObjectDoneStatusInProject,
        updateObjectQuantityInProject
    } from '../../../services/project';
    import { alphaSort } from '../../../services/utils';
    import { project } from '../../../stores';
    import ObjectName from '../../utils/ObjectName.svelte';
    import QuantitySelector from './QuantitySelector.svelte';

    let collapsed = false;
    let sortType: 'category' | 'tier' = 'category';

    let objectsByCategory: ProjectObjectsByCategory = {};

    let projectTotalObjectsCount = 0;
    let projectTotalUnlockCost = 0;

    let showCopyFeedback = false;

    const changeQuantity = (params: ChangeQuantityFnParams) => {
        $project = updateObjectQuantityInProject($project, params);

        updateProjectData();
    };

    const updateProjectData = () => {
        if (sortType === 'category') {
            objectsByCategory = getProjectObjectsByCategory($project);
        }
        if (sortType === 'tier') {
            objectsByCategory = getProjectObjectsByTier($project);
        }
        projectTotalUnlockCost = getProjectTotalUnlockCost($project);
        projectTotalObjectsCount = Object.values($project.objects).reduce((a, b) => a + b.quantity, 0);
    };

    const changeSortType = (value: 'category' | 'tier') => {
        sortType = value;
        updateProjectData();
    };

    const copyToClipboard = () => {
        if (!navigator.clipboard) {
            alert('Your browser does not support the clipboard capability and I am too lazy to make it work');
        }

        const result = Object.keys($project.objects)
            .map((k) => `${$project.objects[k].quantity} x ${k}`)
            .join('\n');

        navigator.clipboard.writeText(result);
        showCopyFeedback = true;
        setInterval(() => (showCopyFeedback = false), 1000);
    };

    afterUpdate(() => {
        if (!$project) {
            return;
        }
        updateProjectData();
    });
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>{$project.name} - inventory</h3>
        <div class="container" class:hidden={collapsed || !$project}>
            {#if Object.keys($project.objects).length === 0}
                <p>Nothing to show. Add objects to the project in the Inventory section.</p>
            {/if}
            {#if Object.keys($project.objects).length !== 0}
                <div class="row align-items-center bottom-separator">
                    <div class="col-sm-4">
                        <div class="d-flex justify-content-between">
                            <span class="important-word">Objects in project</span>
                            {projectTotalObjectsCount}
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="important-word">Project unlock cost</span>
                            {projectTotalUnlockCost}&nbsp;bytes
                        </div>
                    </div>

                    <div class="col-sm-4 d-flex justify-content-between">
                        <span class="important-word">Sort items by&nbsp</span>
                        <div>
                            <div class="form-check form-check-inline">
                                <input
                                    checked={sortType === 'category'}
                                    on:click={() => changeSortType('category')}
                                    class="form-check-input"
                                    type="radio"
                                    id="pictureImage"
                                    value="image"
                                />
                                <label class="form-check-label" for="pictureImage">category</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input
                                    checked={sortType === 'tier'}
                                    on:click={() => changeSortType('tier')}
                                    class="form-check-input"
                                    type="radio"
                                    id="pictureIcon"
                                    value="icon"
                                />
                                <label class="form-check-label" for="pictureIcon">tier</label>
                            </div>
                        </div>
                    </div>

                    <span class="col-sm-2">
                        <button class="btn-danger m-1" on:click={() => changeQuantity({ op: 'reset' })}>
                            Reset project
                        </button>
                        <button
                            id="clipboard-copy-btn"
                            class="m-1 green"
                            class:confirmed={showCopyFeedback}
                            on:click={copyToClipboard}
                        >
                            Copy to clipboard
                        </button>
                    </span>
                </div>

                <div class="table-responsive">
                    <table class="table">
                        {#each Object.keys(objectsByCategory).sort(alphaSort) as category}
                            <tr>
                                <th colspan="3">
                                    <h4 class="content-subheader">{category}</h4>
                                </th>
                            </tr>
                            {#each objectsByCategory[category] as item}
                                <tr>
                                    <td>
                                        <ObjectName
                                            pictureType="both"
                                            object={item.object}
                                            importantWord={true}
                                            pictureSize="larger"
                                        />
                                    </td>

                                    <td>
                                        <span
                                            class="bi bi-check2-circle"
                                            class:bi-check2-circle={$project.objects[item.object.id].done}
                                            class:bi-circle={!$project.objects[item.object.id].done}
                                            on:click={() => {
                                                $project = toggleObjectDoneStatusInProject($project, item.object.id);
                                            }}
                                        />
                                    </td>

                                    <td>
                                        <QuantitySelector
                                            objectId={item.objectName}
                                            quantity={item.quantity}
                                            changeQuantityFn={changeQuantity}
                                        />
                                    </td>
                                </tr>
                            {/each}
                        {/each}
                    </table>
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    .bottom-separator {
        margin-bottom: 1em;
    }
</style>

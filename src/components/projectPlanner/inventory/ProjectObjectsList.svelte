<script lang="ts">
    import { afterUpdate, createEventDispatcher } from 'svelte';
    import {
        getProjectObjectsByCategory,
        getProjectObjectsByTier,
        getProjectTotalUnlockCost,
        ProjectObjectsByCategory
    } from '../../../services/project';
    import { alphaSort } from '../../../services/utils';
    import { project } from '../../../stores';
    import ObjectName from '../../utils/ObjectName.svelte';

    const dispatch = createEventDispatcher();
    let collapsed = false;
    let sortType: 'category' | 'tier' = 'category';

    let objectsByCategory: ProjectObjectsByCategory = {};

    let projectTotalObjectsCount = 0;
    let projectTotalUnlockCost = 0;

    const changeQuantity = (params: { op: 'inc' | 'dec' | 'remove' | 'reset'; objectName?: string }) => {
        const { objectName, op } = params;
        dispatch('updateQuantity', { objectName, op });
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
        projectTotalObjectsCount = Object.values($project).reduce((a, b) => a + b, 0);
    };

    const changeSortType = (value: 'category' | 'tier') => {
        sortType = value;
        updateProjectData();
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
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>Project inventory</h3>
        <div class="container" class:hidden={collapsed || !$project}>
            {#if Object.keys($project).length === 0}
                <p>Nothing to show. Add objects to the project in the Inventory section.</p>
            {/if}
            {#if Object.keys($project).length !== 0}
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

                    <button class="col-sm-4 btn-danger" on:click={() => changeQuantity({ op: 'reset' })}
                        >Reset project</button
                    >
                </div>

                {#each Object.keys(objectsByCategory).sort(alphaSort) as category}
                    <h4 class="content-subheader">{category}</h4>
                    {#each objectsByCategory[category] as item}
                        <div class="row align-items-center bottom-separator">
                            <div class="col-sm-8 d-flex justify-content-between">
                                <ObjectName
                                    pictureType="icon"
                                    object={item.object}
                                    importantWord={true}
                                    largerIcon={true}
                                />
                                <div class="text-align-center">
                                    <button
                                        class="btn-minus"
                                        on:click={() =>
                                            changeQuantity({
                                                objectName: item.objectName,
                                                op: 'dec'
                                            })}
                                    >
                                        -
                                    </button>
                                    <span class="important-word"><b>&nbsp;{item.quantity}&nbsp;</b></span>
                                    <button
                                        class="btn-plus"
                                        on:click={() =>
                                            changeQuantity({
                                                objectName: item.objectName,
                                                op: 'inc'
                                            })}
                                    >
                                        +
                                    </button>
                                    <button
                                        class="btn-remove"
                                        on:click={() =>
                                            changeQuantity({
                                                objectName: item.objectName,
                                                op: 'remove'
                                            })}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                            <div class="col-sm-4 text-align-center">
                                <span>
                                    <img
                                        class="img-fluid object-image"
                                        src={item.object.url.image}
                                        alt={item.object.labels.en}
                                    />
                                </span>
                            </div>
                        </div>
                    {/each}
                {/each}
            {/if}
        </div>
    </div>
</main>

<style>
    .btn-minus {
        border: 1px solid var(--white);
        background-color: var(--white);
        color: var(--blue);
        font-weight: bold;
        font-size: large;

        width: 2em;
    }
    .btn-plus {
        border: 1px solid var(--blue);
        background-color: var(--blue);
        color: var(--white);
        font-weight: bold;
        font-size: large;

        width: 2em;
    }
    .btn-remove {
        border: 1px solid var(--red);
        background-color: var(--red);
        color: var(--white);
        font-weight: bold;
        font-size: large;

        width: 2em;
    }
    .text-align-center {
        text-align: center;
    }
    .object-image {
        max-height: 5em;
    }
    .bottom-separator {
        margin-bottom: 1em;
    }
</style>

<script lang="ts">
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { getProjectObjectsByCategory, getProjectObjectsByTier, getProjectTotalUnlockCost, ProjectObjectsByCategory } from "../../../services/project";
    import { alphaSort } from "../../../services/utils";
    import { project } from "../../../stores";
    import ObjectName from "../../utils/ObjectName.svelte";

    const dispatch = createEventDispatcher();
    let collapsed = false;
    let sortType: "category" | "tier" = "category";

    let objectsByCategory: ProjectObjectsByCategory = {};

    let projectTotalObjectsCount = 0;
    let projectTotalUnlockCost = 0;

    const changeQuantity = (params: {
        op: "inc" | "dec" | "remove" | "reset";
        objectName?: string;
    }) => {
        const { objectName, op } = params;
        dispatch("updateQuantity", { objectName, op });
        updateProjectData();
    };

    const updateProjectData = () => {
        if (sortType === "category") {
            objectsByCategory = getProjectObjectsByCategory($project);
        }
        if (sortType === "tier") {
            objectsByCategory = getProjectObjectsByTier($project);
        }
        projectTotalUnlockCost = getProjectTotalUnlockCost($project);
        projectTotalObjectsCount = Object.values($project).reduce((a, b) => a+b, 0);
    };

    const changeSortType = (value: "category" | "tier") => {
        sortType = value;
        updateProjectData();
    }

    afterUpdate(() => {
        if (!$project) {
            return;
        }
        updateProjectData();
    });
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
            Project inventory
        </h3>
        <div class="container" class:hidden={collapsed || !$project}>
            {#if Object.keys($project).length === 0}
                <p>Nothing to show. Add objects to the project in the Inventory section.</p>
            {/if}
            {#if Object.keys($project).length !== 0}
                <div class="row align-items-center bottom-separator">
                    <div class="col-sm-4">
                        <span class="important-word">Total objects count</span>
                        &nbsp;{projectTotalObjectsCount}
                        <br/>
                        <span class="important-word">Total unlock cost</span>
                        &nbsp;{projectTotalUnlockCost}&nbsp;bytes
                    </div>
                    <button
                        class="col-sm-4 btn-danger"
                        on:click={() => changeQuantity({ op: "reset" })}
                    >Reset project</button
                    >

                    <div class="col-sm-4">
                        <span class="important-word">Sort items by&nbsp</span>
                        <div class="form-check form-check-inline">
                            <input
                                checked={sortType === "category"}
                                on:click={() => changeSortType("category")}
                                class="form-check-input"
                                type="radio"
                                id="pictureImage"
                                value="image"
                            />
                            <label class="form-check-label" for="pictureImage">category</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input
                                checked={sortType === "tier"}
                                on:click={() => changeSortType("tier")}
                                class="form-check-input"
                                type="radio"
                                id="pictureIcon"
                                value="icon"
                            />
                            <label class="form-check-label" for="pictureIcon">tier</label>
                        </div>
                    </div>
                </div>

                {#each Object.keys(objectsByCategory).sort(alphaSort) as category}
                    <h4 class="content-subheader">{category}</h4>
                    {#each objectsByCategory[category] as item}
                        <div class="row align-items-center bottom-separator">
                            <div class="col-sm-4">
                                <ObjectName pictureType="icon" object={item.object} importantWord={true} largerIcon={true} />
                            </div>
                            <div class="col-sm-4 text-align-center">
                                <button
                                    on:click={() =>
                                        changeQuantity({
                                            objectName: item.objectName,
                                            op: "dec",
                                        })}>-</button
                                >
                                &nbsp{item.quantity}&nbsp
                                <button
                                    on:click={() =>
                                        changeQuantity({
                                            objectName: item.objectName,
                                            op: "inc",
                                        })}>+</button
                                >
                                <button
                                    class="btn-danger"
                                    on:click={() =>
                                        changeQuantity({
                                            objectName: item.objectName,
                                            op: "remove",
                                        })}>Remove</button
                                >
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

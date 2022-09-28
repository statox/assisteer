<script lang="ts">
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { BaseObject, getObject } from "../../services/data/objects";
    import { getProjectTotalUnlockCost } from "../../services/project";
    import { project } from "../../stores";

    const dispatch = createEventDispatcher();
    let collapsed = false;

    let projectObjects: {
        objectName: string;
        object: BaseObject;
        quantity: number;
    }[] = [];
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
        projectObjects = [];
        for (const objectName of Object.keys($project)) {
            const object = getObject(objectName);
            const quantity = $project[objectName];

            projectObjects.push({ objectName, object, quantity });
        }
        projectTotalUnlockCost = getProjectTotalUnlockCost($project);
    };

    afterUpdate(() => {
        if (!$project) {
            return;
        }
        updateProjectData();
    });
</script>

<main>
    <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
        Project inventory
    </h3>
    <div class="container" class:hidden={collapsed === true}>
        {#if projectObjects.length}
            <div class="row align-items-center bottom-separator">
                <div class="col-sm-4">
                    <span class="important-word">Total unlock cost</span
                    >&nbsp;<b>{projectTotalUnlockCost}</b>&nbsp;bytes
                </div>
                <button
                    class="col-sm-4 btn-danger"
                    on:click={() => changeQuantity({ op: "reset" })}
                    >Reset project</button
                >
            </div>
            {#each projectObjects as item}
                <div class="row align-items-center bottom-separator">
                    <div class="col-sm-4 important-word">
                        <span>
                            <img
                                class="img-fluid text-sized-image"
                                src={item.object.url.icon}
                                alt={item.object.labels.en}
                            />
                            &nbsp;{item.objectName}
                        </span>
                    </div>
                    <div class="col-sm-4 text-align-center">
                        <button
                            on:click={() =>
                                changeQuantity({
                                    objectName: item.objectName,
                                    op: "dec",
                                })}>-</button
                        >
                        &nbsp<b>{item.quantity}</b>&nbsp
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
        {/if}
    </div>
</main>

<style>
    .text-align-center {
        text-align: center;
    }
    .text-sized-image {
        width: 2em;
    }
    .object-image {
        max-height: 5em;
    }
    .bottom-separator {
        margin-bottom: 1em;
    }
</style>

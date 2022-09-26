<script lang="ts">
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { BaseObject, getObject } from "../../services/data/objects";
    import type { Project } from "../../services/project";

    const dispatch = createEventDispatcher();

    export let project: Project;
    let projectData: {
        objectName: string;
        object: BaseObject;
        quantity: number;
    }[] = [];

    const changeQuantity = (
        objectName: string,
        op: "inc" | "dec" | "remove"
    ) => {
        dispatch("updateQuantity", { objectName, op });
        updateProjectData();
    };

    const updateProjectData = () => {
        projectData = [];
        for (const objectName of Object.keys(project)) {
            const object = getObject(objectName);
            const quantity = project[objectName];

            projectData.push({ objectName, object, quantity });
        }
    };

    afterUpdate(() => {
        if (!project) {
            return;
        }
        updateProjectData();
    });
</script>

<main>
    <h3 class="content-header">Project inventory</h3>
    <div class="container">
        {#if projectData.length}
            {#each projectData as item}
                <div class="row">
                    <div class="col-sm-4">
                        {item.objectName}
                    </div>
                    <div class="col-sm-4">
                        <button
                            on:click={() =>
                                changeQuantity(item.objectName, "dec")}
                            >-</button
                        >
                        &nbsp{item.quantity}&nbsp
                        <button
                            on:click={() =>
                                changeQuantity(item.objectName, "inc")}
                            >+</button
                        >
                        <button
                            on:click={() =>
                                changeQuantity(item.objectName, "remove")}
                            >Remove</button
                        >
                    </div>
                    <div class="col-sm-4">
                        <img
                            src={item.object.url.image}
                            alt={item.object.labels.en}
                        />
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</main>

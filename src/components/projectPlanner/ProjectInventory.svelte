<script lang="ts">
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { BaseObject, getObject } from "../../services/data/objects";
    import type { Project } from "../../services/project";

    const dispatch = createEventDispatcher();
    let collapsed = false;

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
    <h3 class="content-header" on:click="{() => collapsed = !collapsed}">Project inventory</h3>
    <div class="container" class:hidden="{collapsed === true}">
        {#if projectData.length}
            {#each projectData as item}
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
                                changeQuantity(item.objectName, "dec")}
                            >-</button
                        >
                        &nbsp<b>{item.quantity}</b>&nbsp
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

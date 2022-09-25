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
    <div>
        {#if projectData.length}
            <h3>Project inventory</h3>
            {#each projectData as item}
                <div>
                    {item.objectName}
                    <br />
                    <br />
                    <button
                        on:click={() => changeQuantity(item.objectName, "dec")}
                        >-</button
                    >
                    &nbsp{item.quantity}&nbsp
                    <button
                        on:click={() => changeQuantity(item.objectName, "inc")}
                        >+</button
                    >
                    <br />
                    <button
                        on:click={() =>
                            changeQuantity(item.objectName, "remove")}
                        >Remove</button
                    >
                    <br />
                    <img
                        src={item.object.url.image}
                        alt={item.object.labels.en}
                    />
                </div>
            {/each}
        {/if}
    </div>
</main>

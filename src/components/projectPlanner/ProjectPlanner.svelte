<script lang="ts">
    import ObjectSelection from "./ObjectSelection.svelte";
    import ObjectDetails from "./objectDetails/ObjectDetails.svelte";
    import type { BaseObject } from "../../services/data/objects";
    import ProjectObjectsList from "./ProjectObjectsList.svelte";
    import ProjectResourcesList from "./resourcesList/ProjectResourcesList.svelte";
    import ProjectGraph from "./ProjectGraph.svelte";
    import { project } from "../../stores";
    import ProjectPowerAnalyser from "./ProjectPowerAnalyser.svelte";
    import ProjectSettings from "./ProjectSettings.svelte";

    let activeSection = "inventory";
    let selection: {
        object: BaseObject;
        quantity: number;
    } = {
        object: null,
        quantity: null,
    };
    const whenSelectObject = (event: any) => {
        selection.object = event.detail.object.value;
    };
    const whenAddToProject = () => {
        if (!selection.object) {
            return;
        }
        const objectName = selection.object.id;
        if (!$project[objectName]) {
            $project[objectName] = 0;
        }
        $project[objectName] += 1;
    };

    const whenUpdateQuantity = (event: any) => {
        const { objectName, op } = event.detail;
        if (op === "inc") {
            $project[objectName] += 1;
        }
        if (op === "dec") {
            $project[objectName] -= 1;
        }
        if (op === "remove" || $project[objectName] <= 0) {
            $project[objectName] = 0;
            delete $project[objectName];
        }
        if (op === "reset") {
            $project = {};
        }
    };
</script>

<main>
    <div>
        <div class="content-section row nav-menu">
            <span
                class="col nav-item h4"
                class:selected={activeSection === "inventory"}
                on:click={() => (activeSection = "inventory")}>Inventory</span
            >
            <span
                class="col nav-item h4"
                class:selected={activeSection === "resources"}
                on:click={() => (activeSection = "resources")}>Resources</span
            >
            <span
                class="col nav-item h4"
                class:selected={activeSection === "power"}
                on:click={() => (activeSection = "power")}>Power</span
            >
            <span
                class="col nav-item h4"
                class:selected={activeSection === "settings"}
                on:click={() => (activeSection = "settings")}>Settings</span
            >
        </div>

        {#if activeSection === "inventory"}
            <div class="content-section">
                <ObjectSelection
                    on:selectObject={whenSelectObject}
                    on:addObject={whenAddToProject}
                />
                <ObjectDetails object={selection.object} />
            </div>
            <ProjectObjectsList on:updateQuantity={whenUpdateQuantity} />
        {/if}
        {#if activeSection === "resources"}
            <ProjectResourcesList />
            <ProjectGraph />
        {/if}
        {#if activeSection === "settings"}
            <ProjectSettings />
        {/if}
        {#if activeSection === "power"}
            <ProjectPowerAnalyser />
        {/if}
    </div>
</main>

<style>
    .nav-menu {
        text-align: center;
        background: var(--blue);
        padding: 5px;
    }
    .nav-item {
        color: var(--white);
        font-family: astroneer-bold;
    }
    .nav-item.selected {
        color: var(--yellow);
    }
</style>

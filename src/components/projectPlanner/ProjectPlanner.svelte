<script lang="ts">
    import ObjectSelection from "./ObjectSelection.svelte";
    import ObjectDetails from "./objectDetails/ObjectDetails.svelte";
    import type { BaseObject } from "../../services/data/objects";
    import ProjectInventory from "./ProjectInventory.svelte";
    import ProjectResourcesList from "./resourcesList/ProjectResourcesList.svelte";
    import ProjectGraph from "./ProjectGraph.svelte";
    import { project } from "../../stores";
    import ProjectPowerAnalyser from "./ProjectPowerAnalyser.svelte";
    import ProjectSettings from "./ProjectSettings.svelte";

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
        <h2 class="page-header">Project planner</h2>
        <div class="content-section">
            <h3 class="content-header">Object selection</h3>
            <ObjectSelection
                on:selectObject={whenSelectObject}
                on:addObject={whenAddToProject}
            />
            <ObjectDetails object={selection.object} />
        </div>
        <div class="content-section">
            <ProjectInventory on:updateQuantity={whenUpdateQuantity} />
        </div>
        <div class="content-section">
            <ProjectSettings />
        </div>
        <div class="content-section">
            <ProjectResourcesList />
        </div>
        <div class="content-section">
            <ProjectGraph />
        </div>
        <div class="content-section">
            <ProjectPowerAnalyser />
        </div>
    </div>
</main>

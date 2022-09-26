<script lang="ts">
    import ObjectSelection from "./ObjectSelection.svelte";
    import ObjectDetails from "./ObjectDetails.svelte";
    import type { BaseObject } from "../../services/data/objects";
    import RecipeDetails from "./RecipeDetails.svelte";
    import type { Project } from "../../services/project";
    import ProjectInventory from "./ProjectInventory.svelte";
    import ProjectResourcesList from "./ProjectResourcesList.svelte";
    import ProjectGraph from "./ProjectGraph.svelte";

    let project: Project = {};
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
        if (!project[objectName]) {
            project[objectName] = 0;
        }
        project[objectName] += 1;
    };

    const whenUpdateQuantity = (event: any) => {
        const {objectName, op} = event.detail;
        if (op === "inc") {
            project[objectName] += 1;
        }
        if (op === "dec") {
            project[objectName] -= 1;
        }
        if (op === "remove" || project[objectName] <= 0) {
            project[objectName] = 0;
            delete project[objectName];
        }
    };
</script>

<main>
    <div class="top-container">
        <h2>Project planner</h2>
        <p style="text-align: center;">New version - work in progress</p>
        <ObjectSelection
            on:selectObject={whenSelectObject}
            on:addObject={whenAddToProject}
        />
        <ObjectDetails object={selection.object} />
        <RecipeDetails object={selection.object} />
        <ProjectInventory {project} on:updateQuantity={whenUpdateQuantity} />
        <ProjectResourcesList {project} />
        <ProjectGraph {project} />
    </div>
</main>

<script lang="ts">
    import { project, selection } from '../../../stores';
    import ObjectSelection from './ObjectSelection.svelte';
    import ObjectDetails from '../objectDetails/ObjectDetails.svelte';
    import ProjectObjectsList from './ProjectObjectsList.svelte';

    const whenSelectObject = (event: any) => {
        $selection.object = event.detail;
    };

    const whenAddToProject = () => {
        if (!$selection.object) {
            return;
        }
        const objectName = $selection.object.id;
        if (!$project[objectName]) {
            $project[objectName] = 0;
        }
        $project[objectName] += 1;
    };

    const whenUpdateQuantity = (event: any) => {
        const { objectName, op } = event.detail;
        if (op === 'inc') {
            $project[objectName] += 1;
        }
        if (op === 'dec') {
            $project[objectName] -= 1;
        }
        if (op === 'remove' || $project[objectName] <= 0) {
            delete $project[objectName];
            // Make sure to trigger the hook which writes the project
            // to local storage on change
            $project = $project;
        }
        if (op === 'reset') {
            $project = {};
        }
    };
</script>

<main>
    <div class="content-section">
        <ObjectSelection on:selectObject={whenSelectObject} on:addObject={whenAddToProject} />
        <ObjectDetails object={$selection.object} />
    </div>
    <ProjectObjectsList on:updateQuantity={whenUpdateQuantity} />
</main>

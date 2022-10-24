<script lang="ts">
    import { project, selection } from '../../../stores';
    import ObjectSelection from './ObjectSelection.svelte';
    import ObjectDetails from '../objectDetails/ObjectDetails.svelte';

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
</script>

<main>
    <div class="content-section">
        <ObjectSelection on:selectObject={whenSelectObject} on:addObject={whenAddToProject} />
        <ObjectDetails object={$selection.object} />
    </div>
</main>

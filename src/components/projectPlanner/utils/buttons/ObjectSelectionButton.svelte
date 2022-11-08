<script lang="ts">
    import { objectSelectionModalShow, projectListModalShow } from '../../../../stores';
    import NavigationButton from './NavigationButton.svelte';

    export let showName: boolean = false;
    const onClick = () => {
        $objectSelectionModalShow = true;
        $projectListModalShow = false;
    };
</script>

<NavigationButton {onClick} {showName} title="Object selection" iconClass="bi bi-card-list" />

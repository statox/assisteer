<script lang="ts">
    import { objectSelectionModalShow, projectListModalShow } from '../../../../stores';
    import NavigationButton from './NavigationButton.svelte';

    const onClick = () => {
        $projectListModalShow = true;
        $objectSelectionModalShow = false;
    };
</script>

<NavigationButton {onClick} title="Projects list" iconClass="bi bi-list-ul" />

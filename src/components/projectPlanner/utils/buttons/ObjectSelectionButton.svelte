<script lang="ts">
    import { objectSelectionModalShow } from '../../../../stores';
    import NavigationButton from './NavigationButton.svelte';

    export let showName: boolean = false;
    const onClick = () => ($objectSelectionModalShow = true);
</script>

<NavigationButton {onClick} {showName} title="Object selection" iconClass="bi bi-card-list" />

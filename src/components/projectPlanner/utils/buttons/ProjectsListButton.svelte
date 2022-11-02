<script lang="ts">
    import { projectListModalShow } from '../../../../stores';
    import NavigationButton from './NavigationButton.svelte';

    const onClick = () => ($projectListModalShow = true);
</script>

<NavigationButton {onClick} title="Projects list" iconClass="bi bi-list-ul" />

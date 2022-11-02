<script lang="ts">
    export let onClick: () => void;
    export let title: string;
    export let iconClass: string;
    export let showName: boolean = false;
</script>

<button class="nav-item" on:click={onClick} data-toggle="tooltip" data-placement="top" {title}>
    <span class={iconClass} />
    {#if showName}
        {title}
    {/if}
</button>

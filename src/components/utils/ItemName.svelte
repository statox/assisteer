<script lang="ts">
    export let item: {
        url: {
            icon: string;
            image: string;
            wiki: string;
        };
        labels: {
            [lang: string]: string;
        };
    };
    export let pictureType: 'icon' | 'image';
    export let hideName: boolean = false;
    export let largerText: boolean = false;
    export let largerIcon: boolean = false;
    export let boldName: boolean = false;
    export let uppercase: boolean = false;
</script>

<span class="important-word">
    <img class="img-fluid em1" class:em2={largerIcon} src={item.url[pictureType]} alt={item.labels.en} />
    {#if !hideName}
        <span class="important-word label em1" class:em2={largerText} class:uppercase>
            {#if boldName === true}
                <b>{item.labels.en}</b>
            {:else}
                {item.labels.en}
            {/if}
        </span>
    {/if}
</span>

<style>
    .em1 {
        width: 1em;
    }
    .em2 {
        width: 2em;
    }
    .label {
        text-transform: capitalize;
    }
    .label.uppercase {
        text-transform: uppercase !important;
    }
</style>

<script lang="ts">
    type ChangeQuantityFnParams = { objectName: string; op: 'inc' | 'dec' | 'remove' };
    export let objectId: string;
    export let quantity: number;
    export let changeQuantityFn: (params: ChangeQuantityFnParams) => void;
    export let disabled: boolean = false;

    const onClick = (params: ChangeQuantityFnParams) => {
        if (disabled) {
            return;
        }
        changeQuantityFn(params);
    };
</script>

{#if objectId}
    <div class="text-align-center">
        <button
            class="btn-minus"
            on:click={() =>
                onClick({
                    objectName: objectId,
                    op: 'dec'
                })}
        >
            <span class="bi bi-dash-lg" />
        </button>
        <span class="important-word">&nbsp;{quantity}&nbsp;</span>
        <button
            class="btn-plus"
            on:click={() =>
                onClick({
                    objectName: objectId,
                    op: 'inc'
                })}
        >
            <span class="bi bi-plus-lg" />
        </button>
        <button
            class="btn-remove"
            on:click={() =>
                onClick({
                    objectName: objectId,
                    op: 'remove'
                })}
        >
            <span class="bi bi-x-lg" />
        </button>
    </div>
{/if}

<style>
    button {
        padding-left: 0.3em;
        padding-right: 0.3em;
        padding-top: 0.1em;
        padding-bottom: 0.1em;
    }
    .btn-minus {
        border: 1px solid var(--white);
        background-color: var(--white);
        color: var(--blue);
    }
    .btn-plus {
        border: 1px solid var(--blue);
        background-color: var(--blue);
        color: var(--white);
    }
    .btn-remove {
        border: 1px solid var(--red);
        background-color: var(--red);
        color: var(--white);
    }
    .text-align-center {
        text-align: center;
    }
</style>

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
            -
        </button>
        <span class="important-word"><b>&nbsp;{quantity}&nbsp;</b></span>
        <button
            class="btn-plus"
            on:click={() =>
                onClick({
                    objectName: objectId,
                    op: 'inc'
                })}
        >
            +
        </button>
        <button
            class="btn-remove"
            on:click={() =>
                onClick({
                    objectName: objectId,
                    op: 'remove'
                })}
        >
            X
        </button>
    </div>
{/if}

<style>
    .btn-minus {
        border: 1px solid var(--white);
        background-color: var(--white);
        color: var(--blue);
        font-weight: bold;
        font-size: large;

        width: 2em;
    }
    .btn-plus {
        border: 1px solid var(--blue);
        background-color: var(--blue);
        color: var(--white);
        font-weight: bold;
        font-size: large;

        width: 2em;
    }
    .btn-remove {
        border: 1px solid var(--red);
        background-color: var(--red);
        color: var(--white);
        font-weight: bold;
        font-size: large;

        width: 2em;
    }
    .text-align-center {
        text-align: center;
    }
</style>

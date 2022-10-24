<script lang="ts">
    export let objectId: string;
    export let quantity: number;
    export let changeQuantityFn: (params: { objectName: string; op: 'inc' | 'dec' | 'remove' }) => void;
</script>

<div class="text-align-center">
    <button
        class="btn-minus"
        on:click={() =>
            changeQuantityFn({
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
            changeQuantityFn({
                objectName: objectId,
                op: 'inc'
            })}
    >
        +
    </button>
    <button
        class="btn-remove"
        on:click={() =>
            changeQuantityFn({
                objectName: objectId,
                op: 'remove'
            })}
    >
        X
    </button>
</div>

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

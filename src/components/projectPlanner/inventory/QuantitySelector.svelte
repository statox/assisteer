<script lang="ts">
    import type { ChangeQuantityFnParams } from '../../../services/project';

    export let objectId: string;
    export let quantity: number;
    export let changeQuantityFn: (params: ChangeQuantityFnParams) => void;
    export let disabled: boolean = false;

    const changedQuantity = () => {
        if (Number.isNaN(quantity)) {
            return;
        }
        changeQuantityFn({ objectId: objectId, op: 'set', quantity });
    };
    const onClick = (params: ChangeQuantityFnParams) => {
        if (disabled) {
            return;
        }
        changeQuantityFn(params);
    };
</script>

{#if objectId}
    <div>
        <button
            class="btn-minus"
            class:disabled
            on:click={() =>
                onClick({
                    objectId,
                    op: 'dec'
                })}
        >
            <span class="bi bi-dash-lg" />
        </button>
        <input class="quantity-input" type="number" {disabled} bind:value={quantity} on:input={changedQuantity} />
        <button
            class="btn-plus"
            class:disabled
            on:click={() =>
                onClick({
                    objectId,
                    op: 'inc'
                })}
        >
            <span class="bi bi-plus-lg" />
        </button>
        <button
            class="btn-remove"
            class:disabled
            on:click={() =>
                onClick({
                    objectId,
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
    button.disabled {
        border: 1px solid var(--white);
        background-color: var(--grey);
        color: var(--white);
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
    .quantity-input {
        text-align: center;
        color: var(--blue);
        width: 5ex;
        padding: 0;
    }
    /* Remove the arrows from the input on different browsers */
    /* Chrome, Safari, Edge, Opera */
    .quantity-input::-webkit-outer-spin-button,
    .quantity-input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    /* Firefox */
    .quantity-input[type='number'] {
        -moz-appearance: textfield;
    }
</style>

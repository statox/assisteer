<script lang="ts">
    import { getObject } from "../../services/data/objects";


    export let categoryName: string;
    export let categoryItems: any;

    const alphaSort = (a: string, b: string) => (a < b ? -1 : 1);
</script>

<main>
    <div>
        <h4 class="content-subheader">{categoryName}</h4>
        <ul>
            {#each Object.keys(categoryItems).sort(alphaSort) as objectName}
                <li>
                    <span>
                        <b>{categoryItems[objectName]}</b>
                        &nbsp;<img
                            class="resource-icon"
                            src={getObject(objectName).url.image}
                            alt={getObject(objectName).labels.en}
                        />
                        &nbsp;{objectName}
                    </span>
                </li>
            {/each}
        </ul>
    </div>
</main>

<style>
    ul {
        list-style-type: none;
    }
    .resource-icon {
        width: 3em;
    }
</style>

<script lang="ts">
    import {
        getAllResearchDetails,
        ObjectResearchDetails,
    } from "../../services/data/research";

    let researchDetails = getAllResearchDetails();

    let sortBy = { column: "label", ascending: true };

    $: sort = (column: "label" | "category" | "byteValue" | "bpm") => {
        if (sortBy.column === column) {
            sortBy.ascending = !sortBy.ascending;
        } else {
            sortBy.column = column;
            sortBy.ascending = true;
        }

        const sortModifier = sortBy.ascending ? 1 : -1;

        let sort = (a: ObjectResearchDetails, b: ObjectResearchDetails) => {
            if (sortBy.column === "label") {
                return a.labels.en < b.labels.en ? -sortModifier : sortModifier;
            }
            if (sortBy.column === "category") {
                return a.category < b.category ? -sortModifier : sortModifier;
            }
            if (sortBy.column === "byteValue") {
                return a.byteValue < b.byteValue ? -sortModifier : sortModifier;
            }
            if (sortBy.column === "bpm") {
                return a.bytesPerMinute - b.bytesPerMinute
                    ? -sortModifier
                    : sortModifier;
            }
            return a.id < b.id ? -1 : 1;
        };
        researchDetails = researchDetails.sort(sort);
    };
</script>

<main>
    <div class="content-section">
        <h3 class="content-header">Research</h3>
        <div class="container">
            <div class="info">
                <p>
                    Objects can be researched with <a
                        target="none"
                        href="https://astroneer.fandom.com/wiki/Research_Chamber"
                    >the Research Chamber</a
                    >.
                </p>
                <p>
                    The wiki has a reference of <a
                        target="none"
                        href="https://astroneer.fandom.com/wiki/Research_Items"
                    >all the research items by planet</a
                    >
                    and their research information. But I haven't found the same kind
                    of list for
                    <a
                        target="none"
                        href="https://astroneer.fandom.com/wiki/Research_Sample"
                    >the research samples</a
                    >.
                </p>
                <p>
                    You can also use resources in the research chamber with the
                    following values. <b
                    >All the resources take 2.5 minutes to be researched.</b
                    >
                </p>
            </div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th
                                class={sortBy.column === "label"
                                    ? sortBy.ascending
                                        ? "sortedAscending"
                                        : "sortedDescending"
                                    : "notSorted"}
                                on:click={() => sort("label")}>Resource</th
                            >
                            <th
                                class={sortBy.column === "byteValue"
                                    ? sortBy.ascending
                                        ? "sortedAscending"
                                        : "sortedDescending"
                                    : "notSorted"}
                                on:click={() => sort("byteValue")}
                                >Byte value</th
                            >
                            <th
                                class={sortBy.column === "bpm"
                                    ? sortBy.ascending
                                        ? "sortedAscending"
                                        : "sortedDescending"
                                    : "notSorted"}
                                on:click={() => sort("bpm")}
                                >Bytes Per minute</th
                            >
                            <th
                                class={sortBy.column === "category"
                                    ? sortBy.ascending
                                        ? "sortedAscending"
                                        : "sortedDescending"
                                    : "notSorted"}
                                on:click={() => sort("category")}>Category</th
                            >
                        </tr>
                    </thead>
                    <tbody>
                        {#each researchDetails as object}
                            <tr>
                                <td>
                                    <span>
                                        <img
                                            class="img-fluid text-sized-image"
                                            src={object.url.icon}
                                            alt={object.labels.en}
                                        />
                                        &nbsp;{object.labels.en}
                                    </span></td
                                >
                                <td>{object.byteValue}</td>
                                <td>{object.bytesPerMinute}</td>
                                <td>{object.category}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

<style>
    .text-sized-image {
        width: 2em;
    }
    th.sortedAscending:before {
        content: "↑";
        font-weight: 900;
        right: 16px;
        font-size: 1rem;
    }
    th.sortedDescending:before {
        content: "↓";
        font-weight: 900;
        right: 16px;
        font-size: 1rem;
    }
    th.notSorted:before {
        content: "⇅";
        font-weight: 900;
        right: 16px;
        font-size: 1rem;
    }
</style>

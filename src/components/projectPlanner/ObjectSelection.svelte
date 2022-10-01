<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Select from "svelte-select";
    import {
        BaseObject,
        getAllObjectsNames,
        getObject,
    } from "../../services/data/objects";

    const dispatch = createEventDispatcher();
    const allObjectNames = getAllObjectsNames();
    let selectedCategory = { value: "all" };
    let selectedObject: BaseObject;
    const categories = new Set(["all"]);
    const hiddenCategories = ["others", "special_resource"];

    interface SelectItem {
        id: string;
        value: BaseObject;
        label: string;
        group: string;
    }

    const alphaSort = (a: string, b: string) => (a < b ? -1 : 1);
    const canAddToProject = (object: BaseObject) =>
        object && !["atmospheric", "natural"].includes(object.category);

    const items = allObjectNames
        .map((name): SelectItem => {
            const o = getObject(name);
            let group: string = o.category;
            if (o.type === "resource") {
                group = "resource " + o.category;
            }
            if (!hiddenCategories.includes(o.category)) {
                categories.add(group);
            }
            return {
                value: o,
                id: name,
                label: o.labels.en,
                group: group,
            };
        })
        // Prevent selecting objects without recipes (Should probably use recipes directly instead of allObjectNames
        .filter((item) => !hiddenCategories.includes(item.group));

    const orderedCategories = [...categories.values()]
        .map((category: string) => {
            return { value: category, label: category.toUpperCase() };
        })
        .sort((a, b) => (a.value < b.value ? -1 : 1));

    const groupBy = (item: SelectItem) => item.group;
    const objectGroupsFilter = (groups: any) => {
        return groups
            .filter((group: any) => {
                if (selectedCategory.value === "all") {
                    return true;
                }
                return group.match(selectedCategory.value);
            })
            .sort(alphaSort);
    };

    const handleSelectCategory = (event: any) => {
        selectedCategory = event.detail;
    };
    const handleSelect = (event: any) => {
        selectedObject = getObject(event.detail.id);
        dispatch("selectObject", { object: event.detail });
    };
    const handleAdd = () => {
        dispatch("addObject", {});
    };
</script>

<main class="container">
    <div class="row">
        <div class="col-sm-9">
            <Select
                placeholder="Filter category"
                items={orderedCategories}
                on:select={handleSelectCategory}
            />
            <!-- The key block is used to reload the list when the category changes -->
            <!-- https://svelte.dev/docs#template-syntax-key -->
            {#key selectedCategory}
                <Select
                    placeholder="Project item selection"
                    {items}
                    {groupBy}
                    groupFilter={objectGroupsFilter}
                    on:select={handleSelect}
                />
            {/key}
        </div>
        <div class="col-sm-3">
            <button
                disabled={!canAddToProject(selectedObject)}
                on:click={handleAdd}>Add to project</button
            >
        </div>
    </div>
</main>

<style>
button:active {
    color: var(--green);
    background: white;
    border: 1px solid var(--green);
    border-radius: 5px;
    transition: color 0.1s;
    transition-duration: 1;
}
button:active:after {
    color: var(--green);
    background: white;
    content: " ✓";
}
</style>

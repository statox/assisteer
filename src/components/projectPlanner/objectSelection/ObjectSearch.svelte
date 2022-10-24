<script lang="ts">
    import { project } from '../../../stores';
    import { Toast } from 'bootstrap';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { BaseObject, getAllObjectsNames, getObject } from '../../../services/data/objects';
    import ObjectName from '../../utils/ObjectName.svelte';
    import { updateObjectQuantityInProject } from '../../../services/project';
    import QuantitySelector from '../inventory/QuantitySelector.svelte';

    export let object: BaseObject;
    let selectedCategory = { value: 'all' };
    let searchedText = '';

    const dispatch = createEventDispatcher();
    const allObjectNames = getAllObjectsNames();

    const categories = new Set(['all']);
    const hiddenCategories = ['others', 'special_resource'];

    interface SelectItem {
        id: string;
        value: BaseObject;
        label: string;
        group: string;
    }

    const canAddToProject = (object: BaseObject) => object && !['atmospheric', 'natural'].includes(object.category);

    const items = allObjectNames
        .map((name): SelectItem => {
            const o = getObject(name);
            let group: string = o.category;
            if (o.type === 'resource') {
                group = o.category + ' resource';
            }
            if (!hiddenCategories.includes(o.category)) {
                categories.add(group);
            }
            return {
                value: o,
                id: name,
                label: o.labels.en,
                group: group
            };
        })
        // Prevent selecting objects without recipes (Should probably use recipes directly instead of allObjectNames
        .filter((item) => !hiddenCategories.includes(item.group));

    const orderedCategories = [...categories.values()]
        .map((category: string) => {
            return { value: category, label: category };
        })
        .sort((a, b) => {
            if (a.value === 'all') return -1;
            if (b.value === 'all') return 1;
            if (a.value.includes('resource') && !b.value.includes('resource')) return -1;
            if (b.value.includes('resource') && !a.value.includes('resource')) return 1;
            return a.value < b.value ? -1 : 1;
        });

    const filterItems = (searchedText: string) => {
        return items
            .filter((i) => {
                const matchCategory = selectedCategory.value === 'all' || i.group === selectedCategory.value;

                if (!searchedText || !matchCategory) {
                    return matchCategory;
                }

                return i.label.toLowerCase().includes(searchedText.toLowerCase());
            })
            .sort((a, b) => {
                if (a.value.tier !== b.value.tier) {
                    return a.value.tier - b.value.tier;
                }
                return a.label < b.label ? -1 : 1;
            });
    };

    const handleSelect = (item: BaseObject) => {
        object = item;
        dispatch('selectObject', item);
    };
    const handleAdd = (item: BaseObject) => {
        if (!item) {
            return;
        }
        $project = updateObjectQuantityInProject($project, { op: 'add', objectId: item.id });
    };

    onMount(async () => {
        const toastTrigger = document.getElementById('addToProjectBtn');
        var toastElement = document.getElementById('liveToast');
        if (toastTrigger) {
            toastTrigger.addEventListener('click', function () {
                var toast = new Toast(toastElement);
                toast.show();
            });
        }
    });
</script>

<main>
    <h3 class="content-header">Object selection</h3>
    <div class="container">
        <div class="row">
            <div class="col-md-4 select select-objects">
                {#each orderedCategories as category}
                    <div
                        class="select-object category-name"
                        class:selected={category.value === selectedCategory?.value}
                        on:click={() => (selectedCategory = category)}
                    >
                        {category.label}
                    </div>
                {/each}
            </div>

            <div class="col-md-5 select">
                <!-- The key block is used to reload the list when the category changes -->
                <!-- https://svelte.dev/docs#template-syntax-key -->
                {#key selectedCategory}
                    <div class="search">
                        <input class="search-input" bind:value={searchedText} placeholder="Object search" />
                    </div>
                    <div class="select-objects" style="max-height: 185px;">
                        {#if filterItems(searchedText).length === 0}
                            <div class="select-objects-divisor">No matching item found in this category.</div>
                        {/if}
                        {#each filterItems(searchedText) as item, i}
                            {@const filteredItems = filterItems(searchedText)}
                            {#if !['all'].includes(selectedCategory.value) && item.value.tier !== undefined && (i === 0 || filteredItems[i - 1].value.tier !== filteredItems[i].value.tier)}
                                <div class="select-objects-divisor">
                                    Tier {item.value.tier}
                                </div>
                            {/if}
                            <div
                                class="select-object"
                                class:selected={object?.id === item?.id}
                                on:click={() => handleSelect(item.value)}
                            >
                                <ObjectName object={item.value} pictureType={'icon'} disableOpenModal={true} />
                            </div>
                        {/each}
                    </div>
                {/key}
            </div>

            <div class="col">
                <QuantitySelector
                    objectId={object?.id}
                    quantity={$project[object?.id] || 0}
                    disabled={!canAddToProject(object)}
                    changeQuantityFn={(params) => {
                        $project = updateObjectQuantityInProject($project, {
                            op: params.op,
                            objectId: params.objectName
                        });
                    }}
                />
            </div>
        </div>

        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto green">
                        {object?.labels?.en || ''} - Added to the project ✓
                    </strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                </div>
                <div class="toast-body">
                    {#each Object.keys($project) as objectName}
                        {@const item = getObject(objectName)}
                        <div class:green={item.id === object?.id}>
                            <ObjectName object={item} pictureType={'icon'} quantity={$project[objectName]} />
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .category-name {
        text-transform: capitalize;
    }

    .green {
        color: var(--green);
    }

    .search {
        position: relative;
    }

    .search-input {
        width: 100%;
        margin-top: 3px;
        border: 2px solid var(--pale-blue);
        border-radius: 5px;
    }

    .select {
        background: var(--white);
        max-height: 250px;
        border: 2px solid var(--blue);
        border-radius: 5px;
        margin-left: 0.3em;
        margin-bottom: 0.3em;
        padding-top: 10px;
    }

    .select-object {
        cursor: pointer;
    }

    .select-objects {
        overflow-y: auto;
        max-height: 250px;
    }

    .select-objects-divisor {
        font-weight: bold;
        border-bottom: 1px solid black;
        margin-top: 0.3em;
        margin-bottom: 0.3em;
    }

    .selected {
        border: 2px solid var(--pale-blue);
        border-radius: 5px;
        padding-left: 10px;
        font-weight: bold;
    }
</style>
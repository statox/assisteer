<script lang="ts">
    import { afterUpdate } from "svelte";
    import { addElementsFromProject, addElementsFromProjectSeparatedTrees, edgeStyles, getCytoscapeInstance } from "../../services/cytoscape/graph";
    import { project, settings } from '../../stores';
    import { makeNodesMoveSubtree, makeNodesShowHideOnTap } from "../../services/cytoscape";
    import { layouts, runCytoscapeLayout } from "../../services/cytoscape/layouts";

    let cy: cytoscape.Core;
    let collapsed = false;

    let selectedLayout = layouts[0];
    let selectedEdgeStyle = edgeStyles[0];

    const updateGraph = () => {
        const cyContainer = document.getElementById("projectGraphDiv");
        cy = getCytoscapeInstance(cyContainer, { pictureType: $settings.pictureType, edgeStyle: selectedEdgeStyle.id });

        if ($settings.treeSplitByObject) {
            addElementsFromProjectSeparatedTrees(cy, $project);
        } else {
            addElementsFromProject(cy, $project);
        }
        makeNodesShowHideOnTap(cy);
        makeNodesMoveSubtree(cy);

        runCytoscapeLayout(cy, selectedLayout.id);
        cy.fit();
    };

    afterUpdate(updateGraph);
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click="{() => collapsed = !collapsed}">Project graph</h3>
        <div class:hidden="{collapsed === true}">
            <div class="row">
                <div class="col-sm-4">
                    <span class="important-word">
                        <label class="form-check-label" for="layoutSelect">Layout</label>
                        <select bind:value={selectedLayout} on:change={updateGraph}>
                            {#each layouts as layout}
                                <option value={layout}>
                                    {layout.label}
                                </option>
                            {/each}
                        </select>
                    </span>
                </div>
                <div class="col-sm-4">
                    <span class="important-word">
                        <label class="form-check-label" for="layoutSelect">Edges</label>
                        <select bind:value={selectedEdgeStyle} on:change={updateGraph}>
                            {#each edgeStyles as edgeStyle}
                                <option value={edgeStyle}>
                                    {edgeStyle.label}
                                </option>
                            {/each}
                        </select>
                    </span>
                </div>
            </div>
            <hr/>
            <div style="height: 33vw;" id="projectGraphDiv" />
        </div>
    </div>
</main>

<script lang="ts">
    import { afterUpdate } from "svelte";
    import cytoscape from "cytoscape";
    import dagre from "cytoscape-dagre";
    import { getCytoscapeInstance } from "../../services/cytoscape/graph";
    import { projectToFlatTree } from "../../services/project";
    import { project, settings } from '../../stores';
    import { makeNodesMoveSubtree, makeNodesShowHideOnTap } from "../../services/cytoscape";

    let cy: cytoscape.Core;
    let collapsed = false;

    const updateGraph = () => {
        const cyContainer = document.getElementById("projectGraphDiv");
        cy = getCytoscapeInstance(cyContainer, { pictureType: $settings.pictureType });

        const tree = projectToFlatTree($project);
        cy.add(
            tree.nodes.map((n) => {
                return { group: "nodes", data: n };
            })
        );
        cy.add(
            tree.edges.map((e) => {
                return { group: "edges", data: e };
            })
        );
        makeNodesShowHideOnTap(cy);
        makeNodesMoveSubtree(cy);

        cytoscape.use(dagre);
        cy.layout({
            name: "dagre",
            nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node
        } as dagre.DagreLayoutOptions).run();
    };

    afterUpdate(updateGraph);
</script>

<main>
    <h3 class="content-header" on:click="{() => collapsed = !collapsed}">Project graph</h3>
    <div class:hidden="{collapsed === true}">
        <div style="height:400px;" id="projectGraphDiv" />
    </div>
</main>

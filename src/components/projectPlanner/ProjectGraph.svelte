<script lang="ts">
    import { afterUpdate } from "svelte";
    import cytoscape from "cytoscape";
    import dagre from "cytoscape-dagre";
    import { getCytoscapeInstance } from "../../services/cytoscape/graph";
    import { Project, projectToFlatTree } from "../../services/project";

    export let project: Project;
    let cy: cytoscape.Core;

    const updateGraph = () => {
        const cyContainer = document.getElementById("projectGraphDiv");
        cy = getCytoscapeInstance(cyContainer);

        const tree = projectToFlatTree(project);
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

        cytoscape.use(dagre);
        cy.layout({
            name: "dagre",
            nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node
        } as dagre.DagreLayoutOptions).run();
    };

    afterUpdate(updateGraph);
</script>

<main>
    <h3>Project graph</h3>
    <div style="height:400px;" id="projectGraphDiv" />
</main>

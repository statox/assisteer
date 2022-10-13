import cytoscape from 'cytoscape';
import avsdf from 'cytoscape-avsdf';
import cola from 'cytoscape-cola';
import dagre from 'cytoscape-dagre';
import evenParent from 'cytoscape-even-parent';

export type LayoutName = 'avsdf' | 'breadthfirst' | 'circle' | 'cola' | 'concentric' | 'dagre' | 'evenparent';

const layouts: {id: LayoutName, label: string}[] = [
    {id: 'dagre', label: 'Dagre'},
    {id: 'breadthfirst', label: 'Breadth first'},
    {id: 'evenparent', label: 'Even Parent'},
    {id: 'cola', label: 'Cola'},
    {id: 'circle', label: 'Circle'},
    {id: 'concentric', label: 'Concentric'},
    {id: 'avsdf', label: 'AVSDF'},
];

const runCytoscapeLayout = (cy: cytoscape.Core, layout: LayoutName) => {
    if (layout === 'avsdf') {
        cytoscape.use( avsdf );
        cy.layout({
            name: 'avsdf',
        }).run();
    }

    if (layout === 'breadthfirst') {
        cy.layout({
            name: 'breadthfirst',
            directed: true,
        }).run();
    }

    if (layout === 'circle') {
        cy.layout({
            name: 'circle',
            avoidOverlap: true
        }).run();
    }

    if (layout === 'cola') {
        cytoscape.use( cola );
        cy.layout({
            name: 'cola',
            nodeDimensionsIncludeLabels: true,
        } as any).run();
    }

    if (layout === 'concentric') {
        cy.layout({
            name: 'concentric',
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
        }).run();
    }

    if (layout === 'dagre') {
        cytoscape.use(dagre);
        cy.layout({
            name: 'dagre',
            nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node
        } as dagre.DagreLayoutOptions).run();
    }

    if (layout === 'evenparent') {
        cytoscape.use( evenParent );
        cy.layout({
            name: 'evenParent',
            childrenSize: 1,
            verticalPadding: 2000,
            horizontalSpread: false
        } as any).run();
    }
};

export { runCytoscapeLayout, layouts };

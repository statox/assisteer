import cytoscape from 'cytoscape';
import { getObject } from '../data/objects';
import { Project, projectToFlatTree } from '../project';
import { titleCase } from '../utils';

export type EdgeStyle = 'bezier' | 'haystack' | 'straight' | 'taxi';

export const edgeStyles: { id: EdgeStyle; label: string }[] = [
    { id: 'bezier', label: 'Bezier' },
    { id: 'taxi', label: 'Taxi' },
    { id: 'straight', label: 'Straight' },
    { id: 'haystack', label: 'Haystack' }
];

const getCytoscapeInstance = (
    container: HTMLElement,
    params: { pictureType: 'icon' | 'image'; edgeStyle: EdgeStyle }
) => {
    const { pictureType, edgeStyle } = params;
    return cytoscape({
        container: container, // container to render in
        elements: [],
        style: [
            // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    // TODO The doc advises to memoize the functions
                    label: (node: any) => {
                        const qty = node.data('quantity') ? node.data('quantity') + ' ' : '';
                        if (node.data('label')) {
                            return titleCase(qty + node.data('label'));
                        }
                        return qty + node.data('id');
                    },
                    'background-image': (node: any) => {
                        return (
                            node.data('object')?.url[pictureType] ||
                            'https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/74/Icon_Scrap.png'
                        );
                    },
                    'background-fit': 'cover',
                    'background-color': 'white',
                    'font-family': 'astroneer'
                }
            },
            {
                selector: 'edge',
                style: {
                    'curve-style': edgeStyle
                }
            }
        ]
    });
};

const addElementsFromProject = (cy: cytoscape.Core, project: Project, params: { showObjectTool: boolean }) => {
    const tree = projectToFlatTree(project, { includeObjectTool: params.showObjectTool });
    cy.add(
        tree.nodes.map((n) => {
            const object = getObject(n.id);
            return {
                group: 'nodes',
                data: {
                    ...n,
                    label: object.labels.en
                }
            };
        })
    );
    cy.add(
        tree.edges.map((e) => {
            return { group: 'edges', data: e };
        })
    );
};

const addElementsFromProjectSeparatedTrees = (cy: cytoscape.Core, project: Project, params: { showObjectTool: boolean }) => {
    for (const objectName of Object.keys(project.objects)) {
        const subProject: Project = { objects: {} };
        subProject.objects[objectName] = project.objects[objectName];
        const tree = projectToFlatTree(subProject, { includeObjectTool: params.showObjectTool });
        cy.add(
            tree.nodes.map((n) => {
                const object = getObject(n.id);
                n.id = `${objectName}#${n.id}`;
                return {
                    group: 'nodes',
                    data: {
                        ...n,
                        label: object.labels.en
                    }
                };
            })
        );
        cy.add(
            tree.edges.map((e) => {
                e.source = `${objectName}#${e.source}`;
                e.target = `${objectName}#${e.target}`;
                return { group: 'edges', data: e };
            })
        );
    }
};

export { addElementsFromProject, addElementsFromProjectSeparatedTrees, getCytoscapeInstance };

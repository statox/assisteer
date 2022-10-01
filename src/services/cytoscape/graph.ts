import cytoscape from 'cytoscape';
import { getObject } from '../data/objects';
import { Project, projectToFlatTree } from '../project';

const getCytoscapeInstance = (container: HTMLElement, params: { pictureType: "icon" | "image" }) => {
    const { pictureType } = params;
    return cytoscape({
        container: container, // container to render in
        elements: [],
        style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    // TODO The doc advises to memoize the functions
                    'label': (node: any) => {
                        const qty = (node.data('quantity') || "?") + "x ";
                        if (node.data('label')) {
                            return qty + node.data('label');
                        }
                        return qty + node.data('id');
                    },
                    'background-image': (node: any) => {
                        return node.data('object')?.url[pictureType] || 'https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/74/Icon_Scrap.png';
                    },
                    'background-fit': 'cover',
                    'background-color': 'white'
                }
            },
            {
                selector: 'edge',
                style: {
                    'curve-style': 'bezier'
                }
            }
        ]
    });
}

const addElementsFromProject = (cy: cytoscape.Core, project: Project) => {
    const tree = projectToFlatTree(project);
    cy.add(
        tree.nodes.map((n) => {
            const object = getObject(n.id);
            return {
                group: "nodes",
                data: {
                    ...n,
                    label: object.labels.en
                }
            };
        })
    );
    cy.add(
        tree.edges.map((e) => {
            return { group: "edges", data: e };
        })
    );
}

const addElementsFromProjectSeparatedTrees = (cy: cytoscape.Core, project: Project) => {
    for (const objectName of Object.keys(project)) {
        const subProject: Project = {};
        subProject[objectName] = project[objectName];
        const tree = projectToFlatTree(subProject);
        cy.add(
            tree.nodes.map((n) => {
                const object = getObject(n.id);
                n.id = `${objectName}#${n.id}`;
                return {
                    group: "nodes",
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
                return { group: "edges", data: e };
            })
        );
    }
}

export {
    addElementsFromProject,
    addElementsFromProjectSeparatedTrees,
    getCytoscapeInstance,
};

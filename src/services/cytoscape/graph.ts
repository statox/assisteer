import cytoscape from 'cytoscape';

const getCytoscapeInstance = (container: HTMLElement) => {
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
                        return node.data('object')?.url?.image || 'https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/74/Icon_Scrap.png';
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

export { getCytoscapeInstance };

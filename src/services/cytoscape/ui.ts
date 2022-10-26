import type cytoscape from 'cytoscape';

/*
 * Add event listeners to all nodes so that they move
 * all their successors when drag and dropped
 * From https://stackoverflow.com/q/35401302
 */
function makeNodesMoveSubtree(cy: cytoscape.Core) {
    let grab_x = 0;
    let grab_y = 0;
    let drag_subgraph = [];

    function handle_grab() {
        grab_x = this.position().x;
        grab_y = this.position().y;
        const succ = this.successors();
        drag_subgraph = [];
        for (let i = 0; i < succ.length; i++) {
            if (succ[i].isNode()) {
                const old_x = succ[i].position().x;
                const old_y = succ[i].position().y;
                drag_subgraph.push({ old_x: old_x, old_y: old_y, obj: succ[i] });
            }
        }
    }
    function handle_drag() {
        const new_x = this.position().x;
        const new_y = this.position().y;
        const delta_x = new_x - grab_x;
        const delta_y = new_y - grab_y;
        for (let i = 0; i < drag_subgraph.length; i++) {
            const obj = drag_subgraph[i].obj;
            const old_x = drag_subgraph[i].old_x;
            const old_y = drag_subgraph[i].old_y;
            const new_x = old_x + delta_x;
            const new_y = old_y + delta_y;
            obj.position({ x: new_x, y: new_y });
        }
    }

    const all = cy.elements('node');
    for (let j = 0; j < all.length; j++) {
        const cynode = all[j];
        cynode.on('grab', handle_grab);
        cynode.on('drag', handle_drag);
    }
}

/*
 * Allow to hide/show successors when clicking a node
 */
function makeNodesShowHideOnTap(cy: cytoscape.Core) {
    cy.on('tap', 'node', function() {
        if (this.scratch().restData == null) {
            // Save node data and remove
            this.scratch({
                restData: this.successors().targets().remove()
            });
        } else {
            // Restore the removed nodes from saved data
            this.scratch().restData.restore();
            this.scratch({
                restData: null
            });
        }
    });
}

export { makeNodesMoveSubtree, makeNodesShowHideOnTap };

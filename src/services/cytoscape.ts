import type cytoscape from "cytoscape";

/*
 * Add event listeners to all nodes so that they move
 * all their successors when drag and dropped
 * From https://stackoverflow.com/q/35401302
 */
function makeNodesMoveSubtree(cy: cytoscape.Core) {
  var grab_x = 0;
  var grab_y = 0;
  var drag_subgraph = [];

  function handle_grab() {
    grab_x = this.position().x;
    grab_y = this.position().y;
    var succ = this.successors();
    drag_subgraph = [];
    for (let i = 0; i < succ.length; i++) {
      if (succ[i].isNode()) {
        var old_x = succ[i].position().x;
        var old_y = succ[i].position().y;
        drag_subgraph.push({ old_x: old_x, old_y: old_y, obj: succ[i] });
      }
    }
  }
  function handle_drag() {
    var new_x = this.position().x;
    var new_y = this.position().y;
    var delta_x = new_x - grab_x;
    var delta_y = new_y - grab_y;
    for (let i = 0; i < drag_subgraph.length; i++) {
      var obj = drag_subgraph[i].obj;
      var old_x = drag_subgraph[i].old_x;
      var old_y = drag_subgraph[i].old_y;
      var new_x = old_x + delta_x;
      var new_y = old_y + delta_y;
      obj.position({ x: new_x, y: new_y });
    }
  }

  var all = cy.elements("node");
  for (let j = 0; j < all.length; j++) {
    let cynode = all[j];
    cynode.on("grab", handle_grab);
    cynode.on("drag", handle_drag);
  }
}

/*
 * Allow to hide/show successors when clicking a node
 */
function makeNodesShowHideOnTap(cy: cytoscape.Core) {
  cy.on("tap", "node", function () {
    if (this.scratch().restData == null) {
      // Save node data and remove
      this.scratch({
        restData: this.successors().targets().remove(),
      });
    } else {
      // Restore the removed nodes from saved data
      this.scratch().restData.restore();
      this.scratch({
        restData: null,
      });
    }
  });
}

export { makeNodesMoveSubtree, makeNodesShowHideOnTap };

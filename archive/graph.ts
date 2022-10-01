import { v4 as uuidv4 } from "uuid";
import type { Planet } from "../types";
import type { GenericObject } from "../types/objects.types";

const nodeExists = (cy: cytoscape.Core, id: string) => {
    return cy.getElementById(id).length > 0;
};

/*
 * Add a node for a resource only if it doesn't exist already
 * Return the new node or the existing one
 */
const addResourceNode = (
    cy: cytoscape.Core,
    params: { id: string; icon: string }
) => {
    if (nodeExists(cy, params.id)) {
        return cy.getElementById(params.id);
    }
    return cy.add({
        group: "nodes",
        data: params,
    });
};

/*
 * Add a node for a tool and an edge to a resource node
 * Return the tool node
 */
const addToolForResourceNode = (
    cy: cytoscape.Core,
    params: {
        toolName: string;
        toolIcon: string;
        resourceName: string;
    }
) => {
    const toolId = params.resourceName + params.toolName + uuidv4(); // uuidv4 is a shitty hack until I find a better way to handle duplicate dependencies
    const node = cy.add({
        group: "nodes",
        data: {
            id: toolId,
            type: "tool",
            label: params.toolName,
            icon: params.toolIcon,
        },
    });

    cy.add({
        group: "edges",
        data: {
            source: params.resourceName,
            target: toolId,
        },
    });

    return node;
};

const addResourceForToolNode = (
    cy: cytoscape.Core,
    params: {
        targetResourceName: string;
        targetResourceIcon: string;
        targetResource: GenericObject;
        sourceNodeId: string;
        quantity: number;
    }
) => {
    addResourceNode(cy, {
        id: params.targetResourceName,
        icon: params.targetResourceIcon,
    });

    cy.add({
        group: "edges",
        data: {
            type: "count",
            source: params.sourceNodeId,
            target: params.targetResourceName,
            label: "x" + params.quantity,
            targetResource: params.targetResource,
            count: params.quantity,
        },
    });
};

/*
 * Takes a list of planets or "all" and a parentNodeId (usually a toolNode)
 * - Depending on mergeUniquePlanets create one or distinct nodes for the planets
 * (without duplicate for individual planets)
 ** - Then create the edges from the new nodes to the parent node
 */
const addPlanetToNodeNode = (
    cy: cytoscape.Core,
    params: {
        parentNodeId: string;
        mergeUniquePlanets: boolean;
        planets: "all" | Planet[];
    }
) => {
    let planetsList: string[];
    if (Array.isArray(params.planets)) {
        if (params.mergeUniquePlanets) {
            planetsList = [params.planets.toString()];
        } else {
            planetsList = params.planets;
        }
    } else {
        planetsList = [params.planets];
    }

    for (const planet of planetsList) {
        if (!nodeExists(cy, planet)) {
            cy.add({
                group: "nodes",
                data: {
                    id: planet,
                    type: "planet",
                },
            });
        }

        cy.add({
            group: "edges",
            data: {
                source: params.parentNodeId,
                target: planet,
            },
        });
    }
};

export {
    addPlanetToNodeNode,
    addResourceForToolNode,
    addResourceNode,
    addToolForResourceNode
};

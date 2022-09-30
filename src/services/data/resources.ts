import resourcesDetails from '../../data2/resourcesDetails.json';
// import planets from '../../data2/planets.json';
import { getAllPlanets, Planet } from './planets';

export type ResourceLocationDetails = {
    primary: {
        planet: string,
        description: string
    };
    secondary: {
        planet: string,
        description: string
    }
};

export type ResourceDetails = {
    classification: "mineral" | "organic" | "ore";
    location: ResourceLocationDetails
};

const aggregatedDetails = { ...resourcesDetails };

const planets = getAllPlanets();

for (const planet of planets) {
    if (planet.resources) {
        const { id, description } = planet.resources.primary;
        if (!aggregatedDetails[id].location) {
            aggregatedDetails[id].location = {};
        }
        aggregatedDetails[id].location.primary = {
            planet: planet.id,
            description
        }
    }
    if (planet.resources) {
        const { id, description } = planet.resources.secondary;
        if (!aggregatedDetails[id].location) {
            aggregatedDetails[id].location = {};
        }
        aggregatedDetails[id].location.secondary = {
            planet: planet.id,
            description
        }
    }
}

const getResourceDetails = (resourceName: string): ResourceDetails => {
    return aggregatedDetails[resourceName];
};

export { getResourceDetails };

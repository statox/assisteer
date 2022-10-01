import resourcesDetails from '../../data/resourcesDetails.json';
import { getAllPlanets, Planet } from './planets';

export type NaturalResourceLocation = {
    primary: {
        planet: Planet,
        description: string
    };
    secondary: {
        planet: Planet,
        description: string
    }
};

export type AtmosphericResourceLocations = {
    planet: Planet,
    density: number
}[];

export type ResourceDetails = {
    classification: "mineral" | "organic" | "ore";
};

const atmosphericResourcesLocation: {
    [resouceName: string]: AtmosphericResourceLocations;
} = {};

const naturalResourcesLocation: {
    [resouceName: string]: NaturalResourceLocation;
} = {};

const planets = getAllPlanets();

for (const planet of planets) {
    if (planet.resources) {
        const { id: idPrimary, description: descriptionPrimary } = planet.resources.primary;
        if (!naturalResourcesLocation[idPrimary]) {
            naturalResourcesLocation[idPrimary] = {} as NaturalResourceLocation;
        }
        naturalResourcesLocation[idPrimary].primary = {
            planet,
            description: descriptionPrimary
        }

        const { id: idSecondary, description: descriptionSecondary } = planet.resources.secondary;
        if (!naturalResourcesLocation[idSecondary]) {
            naturalResourcesLocation[idSecondary] = {} as NaturalResourceLocation;
        }
        naturalResourcesLocation[idSecondary].secondary = {
            planet,
            description: descriptionSecondary
        }
    }

    if (planet.gases) {
        for (const gasName of Object.keys(planet.gases)) {
            if (!atmosphericResourcesLocation[gasName]) {
                atmosphericResourcesLocation[gasName] = []
            }

            atmosphericResourcesLocation[gasName].push({
                planet,
                density: planet.gases[gasName]
            });
        }
    }
}

const getNaturalResourceLocation = (resourceName: string): NaturalResourceLocation => {
    return naturalResourcesLocation[resourceName];
};

const getAlmosphericResourceLocation = (resourceName: string): AtmosphericResourceLocations => {
    return atmosphericResourcesLocation[resourceName];
};

const getResourceDetails = (resourceName: string): ResourceDetails => {
    return resourcesDetails[resourceName];
};

export { getAlmosphericResourceLocation, getNaturalResourceLocation, getResourceDetails };

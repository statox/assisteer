import resourcesDetails from '../../data2/resourcesDetails.json';
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

export type ResourceDetails = {
    classification: "mineral" | "organic" | "ore";
};

const resourcesLocation: {
    [resouceName: string]: NaturalResourceLocation;
}= {};

const planets = getAllPlanets();

for (const planet of planets) {
    if (planet.resources) {
        const { id: idPrimary, description: descriptionPrimary } = planet.resources.primary;
        if (!resourcesLocation[idPrimary]) {
            resourcesLocation[idPrimary] = {} as NaturalResourceLocation;
        }
        resourcesLocation[idPrimary].primary = {
            planet,
            description: descriptionPrimary
        }

        const { id: idSecondary, description: descriptionSecondary } = planet.resources.secondary;
        if (!resourcesLocation[idSecondary]) {
            resourcesLocation[idSecondary] = {} as NaturalResourceLocation;
        }
        resourcesLocation[idSecondary].secondary = {
            planet,
            description: descriptionSecondary
        }
    }
}

const getNaturalResourceLocation = (resourceName: string): NaturalResourceLocation => {
    return resourcesLocation[resourceName];
};

const getResourceDetails = (resourceName: string): ResourceDetails => {
    return resourcesDetails[resourceName];
};

export {getNaturalResourceLocation, getResourceDetails };

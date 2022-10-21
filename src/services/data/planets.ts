import planets from '../../data/planets.json';
import galastropods from '../../data/galastropods.json';
import type { Galastropod } from './galastropods';

type PlanetLocationDetails = {
    id: string;
    description: string;
};
export type LocationDetails = {
    primary: PlanetLocationDetails;
    secondary: PlanetLocationDetails;
};

export type Planet = {
    id: string;
    type: string;
    resources?: LocationDetails;
    moonId?: string;
    galastropod: string;
    gases: {
        [gasId: string]: number;
    };
    // difficulty: 'easy' | 'medium' | 'hard' | 'very hard';
    difficulty: string;
    power: {
        dayNightCycleSeconds: number;
        // sun: 'very low' | 'low' | 'medium' | 'high' | 'very high';
        // wind: 'very low' | 'low' | 'medium' | 'high' | 'very high';
        sun: string;
        wind: string;
        wikiWindCoefficient: number; // The wiki says the wind coeffients are not related to the planets wind power category
    };
    gatewayNetwork: {
        gatewayPower: number;
        coreMaterial: string;
    };
    url: {
        wiki: string;
        icon: string;
        image: string;
        gateway_icon: string;
    };
    labels: {
        [lang: string]: string;
    };
    orderToSun: number;
};

const getPlanet = (planetId: string): Planet => {
    return planets[planetId];
};

const allPlanets: Planet[] = [];
for (const planet of Object.values(planets)) {
    const galastropod = Object.values(galastropods).find(g => g.planet === planet.id)?.id;
    allPlanets.push({
        ...planet,
        galastropod
    });
}
const getAllPlanets = (): Planet[] => {
    return allPlanets.sort((a, b) => a.orderToSun - b.orderToSun);
};

const getAllPlanetsMap = () => planets;

export { getAllPlanets, getAllPlanetsMap, getPlanet };

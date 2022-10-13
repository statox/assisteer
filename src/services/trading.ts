import exchangeRates from "../data/exchangeRates.json";
import { getObject } from "./data/objects";
import { getProjectResourcesByCategories, Project, ProjectLightResourcesByCategory } from "./project";

interface PossibleTrades {
    resourceId: string;
    soil?: {
        currencyRequired: number;
        resourcesProduced: number;
        surplus: number;
    }
    scrap?: {
        currencyRequired: number;
        resourcesProduced: number;
        surplus: number;
    }
}
export interface TradingStats {
    totalSoil: number;
    totalScrap: number;
    possibleTrades: PossibleTrades[];
}
const getProjectTradingStats = (project: Project) => {
    const resourcesList = getProjectResourcesByCategories(project);
    const soilRequirements = getResourcesSoilRequirements(resourcesList);
    const scrapRequirements = getResourcesScrapRequirement(resourcesList);

    const result: TradingStats = {
        totalSoil: soilRequirements.total,
        totalScrap: scrapRequirements.total,
        possibleTrades: []
    }

    const tradableResources = new Set([
        ...Object.keys(soilRequirements.byResource),
        ...Object.keys(scrapRequirements.byResource)
    ]);

    for (const resource of tradableResources) {
        const possibleTrades: PossibleTrades = {
            resourceId: resource,
        }
        if (soilRequirements.byResource[resource]) {
            possibleTrades.soil = {
                currencyRequired: soilRequirements.byResource[resource].soilRequired,
                resourcesProduced: soilRequirements.byResource[resource].quantityProduced,
                surplus: soilRequirements.byResource[resource].surplus
            }
        }
        if (scrapRequirements.byResource[resource]) {
            possibleTrades.scrap = {
                currencyRequired: scrapRequirements.byResource[resource].scrapRequired,
                resourcesProduced: scrapRequirements.byResource[resource].quantityProduced,
                surplus: scrapRequirements.byResource[resource].surplus
            }
        }
        result.possibleTrades.push(possibleTrades);
    }
    result.possibleTrades.sort((a, b) => {
        const objectA = getObject(a.resourceId);
        const objectB = getObject(b.resourceId);
        return objectA.labels.en < objectB.labels.en ? -1 : 1;
    });
    return result;
}

export type SoilRequirements = {
    total: number,
    byResource: {
        [resourceName: string]: {
            soilRequired: number,
            quantityProduced: number,
            surplus: number
        }
    }
}
const getResourcesSoilRequirements = (projectResources: ProjectLightResourcesByCategory): SoilRequirements => {
    const soilRequirements = {
        total: 0,
        byResource: {}
    };

    if (!projectResources || !projectResources['natural']) {
        return soilRequirements;
    }

    const soilProduction = exchangeRates.soilCentrifuge;

    for (const resourceName of Object.keys(projectResources['natural'])) {
        const quantity = projectResources['natural'][resourceName];
        if (!soilProduction[resourceName]) {
            continue;
        }
        const requiredSoilForResource = Math.ceil(quantity / soilProduction[resourceName]);
        soilRequirements.total += requiredSoilForResource;

        const soilRequired = requiredSoilForResource;
        const quantityProduced = requiredSoilForResource * soilProduction[resourceName];
        const surplus = quantityProduced - quantity;

        soilRequirements.byResource[resourceName] = {
            soilRequired,
            quantityProduced,
            surplus
        }
    }
    return soilRequirements;
}

export type ScrapRequirements = {
    total: number,
    byResource: {
        [resourceName: string]: {
            scrapRequired: number,
            quantityProduced: number,
            surplus: number
        }
    }
}
const getResourcesScrapRequirement = (projectResources: ProjectLightResourcesByCategory): ScrapRequirements => {
    const scrapRequirements = {
        total: 0,
        byResource: {}
    };

    if (!projectResources || !projectResources['natural']) {
        return scrapRequirements;
    }

    const scrapProduction = exchangeRates.tradePlatformScrap;

    for (const resourceName of Object.keys(projectResources['natural'])) {
        const quantity = projectResources['natural'][resourceName];
        if (!scrapProduction[resourceName]) {
            continue;
        }

        const requiredScrapBundlesForResource = Math.ceil(quantity / scrapProduction[resourceName].item);
        const requiredScrapForResource = requiredScrapBundlesForResource * scrapProduction[resourceName].scrap;
        const quantityProduced = requiredScrapBundlesForResource * scrapProduction[resourceName].item;
        const surplus = quantityProduced - quantity;

        scrapRequirements.total += requiredScrapForResource;

        scrapRequirements.byResource[resourceName] = {
            scrapRequired: requiredScrapForResource,
            quantityProduced,
            surplus
        }
    }

    return scrapRequirements;
}

export {
    getProjectTradingStats,
}

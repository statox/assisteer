import exchangeRates from '../data/exchangeRates.json';
import { getObject } from './data/objects';
import { getProjectResourcesByCategories, Project, ProjectLightResourcesByCategory } from './project';
import { getSoilCentrifugeTimeToRun, getTradePlatformTimeToRun } from './tools';

export interface PossibleTrades {
    resourceId: string;
    soil?: {
        currencyRequired: number;
        resourcesProduced: number;
        surplus: number;
        requiredRounds: number;
        timeToRun: number;
    };
    scrap?: {
        currencyRequired: number;
        resourcesProduced: number;
        surplus: number;
        requiredRounds: number;
        timeToRun: number;
    };
}
export interface TradingStats {
    totalSoil: number;
    totalScrap: number;
    totalScrapForScrapOnlyObjects: number;
    possibleTrades: PossibleTrades[];
}

const getSoilTradingRates = () => exchangeRates.soilCentrifuge;
const getScrapTradingRates = () => exchangeRates.tradePlatformScrap;
const getAstroniumTradingRates = () => exchangeRates.tradePlatformAstronium;

const getObjectTradingStats = (objectName: string): PossibleTrades => {
    const scrap = exchangeRates.tradePlatformScrap[objectName];
    const soil = exchangeRates.soilCentrifuge[objectName];

    if (!scrap && !soil) {
        return;
    }

    const result: PossibleTrades = {
        resourceId: objectName
    };

    if (scrap) {
        result.scrap = {
            currencyRequired: scrap.scrap,
            resourcesProduced: scrap.item,
            surplus: 0,
            requiredRounds: 1,
            timeToRun: getTradePlatformTimeToRun(1)
        };
    }

    if (soil) {
        result.soil = {
            currencyRequired: 1,
            resourcesProduced: soil,
            surplus: 0,
            requiredRounds: 1,
            timeToRun: getSoilCentrifugeTimeToRun(1)
        };
    }

    return result;
};

const getProjectTradingStats = (project: Project) => {
    const resourcesList = getProjectResourcesByCategories(project);
    const soilRequirements = getResourcesSoilRequirements(resourcesList);
    const scrapRequirements = getResourcesScrapRequirement(resourcesList);

    const result: TradingStats = {
        totalSoil: soilRequirements.total,
        totalScrap: scrapRequirements.total,
        totalScrapForScrapOnlyObjects: 0,
        possibleTrades: []
    };

    const tradableResources = Array.from(
        new Set<string>([...Object.keys(soilRequirements.byResource), ...Object.keys(scrapRequirements.byResource)])
    );

    for (const resource of tradableResources) {
        const possibleTrades: PossibleTrades = {
            resourceId: resource
        };
        if (soilRequirements.byResource[resource]) {
            possibleTrades.soil = {
                currencyRequired: soilRequirements.byResource[resource].soilRequired,
                resourcesProduced: soilRequirements.byResource[resource].quantityProduced,
                surplus: soilRequirements.byResource[resource].surplus,
                requiredRounds: soilRequirements.byResource[resource].requiredRounds,
                timeToRun: soilRequirements.byResource[resource].timeToRun
            };
        }
        if (scrapRequirements.byResource[resource]) {
            possibleTrades.scrap = {
                currencyRequired: scrapRequirements.byResource[resource].scrapRequired,
                resourcesProduced: scrapRequirements.byResource[resource].quantityProduced,
                surplus: scrapRequirements.byResource[resource].surplus,
                requiredRounds: scrapRequirements.byResource[resource].requiredRounds,
                timeToRun: scrapRequirements.byResource[resource].timeToRun
            };

            if (!soilRequirements.byResource[resource]) {
                result.totalScrapForScrapOnlyObjects += scrapRequirements.byResource[resource].scrapRequired;
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
};

export type SoilRequirements = {
    total: number;
    byResource: {
        [resourceName: string]: {
            soilRequired: number;
            quantityProduced: number;
            surplus: number;
            requiredRounds: number;
            timeToRun: number;
        };
    };
};
const getResourcesSoilRequirements = (projectResources: ProjectLightResourcesByCategory) => {
    const soilRequirements: SoilRequirements = {
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
        // The Soil centrifuge can take 2 soil canisters in one round producing
        // 2 * exchangeRates.soilCentrifuge[resourceName] quantity of the resource
        // So we can deduce the number of time the soil centrifuge will need to run
        // to produce the right amount of resources
        const requiredRounds = Math.ceil(requiredSoilForResource / 2);
        const timeToRun = getSoilCentrifugeTimeToRun(requiredRounds);

        soilRequirements.byResource[resourceName] = {
            soilRequired,
            quantityProduced,
            surplus,
            requiredRounds,
            timeToRun
        };
    }
    return soilRequirements;
};

export type ScrapRequirements = {
    total: number;
    byResource: {
        [resourceName: string]: {
            scrapRequired: number;
            quantityProduced: number;
            surplus: number;
            requiredRounds: number;
            timeToRun: number;
        };
    };
};
const getResourcesScrapRequirement = (projectResources: ProjectLightResourcesByCategory): ScrapRequirements => {
    const scrapRequirements: ScrapRequirements = {
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
        // The Trade platform can take exchangeRates.tradePlatformScrap[resourceName].maxScrapPerRound
        // bundles of scrap per trip
        // So we can deduce the number of time the trade platform will need to run
        // to produce the right amount of resources
        const requiredRounds = Math.ceil(requiredScrapForResource / exchangeRates.tradePlatformScrap[resourceName].maxScrapPerRound);
        const timeToRun = getTradePlatformTimeToRun(requiredRounds);

        scrapRequirements.total += requiredScrapForResource;

        scrapRequirements.byResource[resourceName] = {
            scrapRequired: requiredScrapForResource,
            quantityProduced,
            surplus,
            requiredRounds,
            timeToRun
        };
    }

    return scrapRequirements;
};

export { getAstroniumTradingRates, getObjectTradingStats, getProjectTradingStats, getScrapTradingRates, getSoilTradingRates };

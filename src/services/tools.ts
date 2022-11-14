const TRADE_PLATFORM_CYCLE_TIME_SECONDS = 45;
export const getTradePlatformTimeToRun = (numberOfTrips: number) => TRADE_PLATFORM_CYCLE_TIME_SECONDS * numberOfTrips;


// According to the wiki https://astroneer.fandom.com/wiki/Soil_Centrifuge
// In total, the Centrifuge requires approximately
// ~45-46s to complete a full cycle for a resource that is produced at a rate of 8 per fully-filled cycle,
// ~44s for 6 per cycle,
// ~42s for 4 per cycle,
// ~41s for 2 per cycle,
// and ~40-41s for 1 per cycle.
// For now we will just average that to 42 seconds and rework it later on
const SOIL_CENTRIFUGE_CYCLE_TIME_SECONDS = 42;
export const getSoilCentrifugeTimeToRun = (numberOfRounds: number) => SOIL_CENTRIFUGE_CYCLE_TIME_SECONDS * numberOfRounds;

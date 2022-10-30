import { Writable, writable } from 'svelte/store';
import { getAllPlanets, getPlanet, Planet } from '../services/data/planets';

const defaultPlanet = getPlanet('sylva');
const planets = getAllPlanets();

const storedSelectedPlanetId = localStorage.getItem('power_selectedPlanet');

let selectedPlanet: Writable<Planet>;
if (storedSelectedPlanetId !== null) {
    selectedPlanet = writable<Planet>(planets.find((p) => p.id === storedSelectedPlanetId) || defaultPlanet);
} else {
    selectedPlanet = writable<Planet>(defaultPlanet);
}

selectedPlanet.subscribe((value) => {
    localStorage.setItem('power_selectedPlanet', value.id);
});

export { selectedPlanet as selectedPowerPlanet };

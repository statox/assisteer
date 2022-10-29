import { writable } from 'svelte/store';
import type { BaseObject } from '../services/data/objects';

const modalShown = writable<boolean>(false);
const modalObject = writable<BaseObject>(null);


export { modalShown, modalObject };

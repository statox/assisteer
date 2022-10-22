/** @typedef {typeof __propDef.props}  MultiProps */
/** @typedef {typeof __propDef.events}  MultiEvents */
/** @typedef {typeof __propDef.slots}  MultiSlots */
export default class Multi extends SvelteComponentTyped<{
    ClearIcon: any;
    value?: any[];
    activeValue?: any;
    isDisabled?: boolean;
    multiFullItemClearable?: boolean;
    getSelectionLabel?: any;
}, {
    multiItemClear: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type MultiProps = typeof __propDef.props;
export type MultiEvents = typeof __propDef.events;
export type MultiSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        ClearIcon: any;
        value?: any[];
        activeValue?: any;
        isDisabled?: boolean;
        multiFullItemClearable?: boolean;
        getSelectionLabel?: any;
    };
    events: {
        multiItemClear: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};

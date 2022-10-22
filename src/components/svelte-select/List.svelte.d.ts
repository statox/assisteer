/** @typedef {typeof __propDef.props}  ListProps */
/** @typedef {typeof __propDef.events}  ListEvents */
/** @typedef {typeof __propDef.slots}  ListSlots */
export default class List extends SvelteComponentTyped<{
    getOptionLabel: any;
    filterText: any;
    Item: any;
    VirtualList: any;
    optionIdentifier: any;
    noOptionsMessage: any;
    hideEmptyState: any;
    value: any;
    isMulti: any;
    getGroupHeaderLabel: any;
    items: any;
    itemHeight: any;
    listPlacement: any;
    parent: any;
    listAutoWidth: any;
    listOffset: any;
    suggestionMode: any;
    list?: any;
    hoverItemIndex?: number;
    activeItemIndex?: number;
}, {
    itemSelected: CustomEvent<any>;
    itemCreated: CustomEvent<any>;
    closeList: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ListProps = typeof __propDef.props;
export type ListEvents = typeof __propDef.events;
export type ListSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        getOptionLabel: any;
        filterText: any;
        Item: any;
        VirtualList: any;
        optionIdentifier: any;
        noOptionsMessage: any;
        hideEmptyState: any;
        value: any;
        isMulti: any;
        getGroupHeaderLabel: any;
        items: any;
        itemHeight: any;
        listPlacement: any;
        parent: any;
        listAutoWidth: any;
        listOffset: any;
        suggestionMode: any;
        list?: any;
        hoverItemIndex?: number;
        activeItemIndex?: number;
    };
    events: {
        itemSelected: CustomEvent<any>;
        itemCreated: CustomEvent<any>;
        closeList: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};

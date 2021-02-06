import { Dictionary, DictionaryItem } from "../../types";


export const INITIAL_LOAD = "INITIAL_LOAD";
export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";

export interface InitialLoadAction {
    type : typeof INITIAL_LOAD,
    data: Dictionary
}

export interface AddItemAction {
    type : typeof ADD_ITEM,
    item: DictionaryItem
}

export interface RemoveItemAction {
    type : typeof REMOVE_ITEM,
    item: DictionaryItem
}

export type ActionTypes = InitialLoadAction | AddItemAction | RemoveItemAction


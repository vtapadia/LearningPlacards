import { Dictionary, DictionaryItem } from "../../types";
import { ADD_ITEM, INITIAL_LOAD, REMOVE_ITEM } from "./actionTypes";


export function initialLoad(dictionary:Dictionary) {
    return {
        type: INITIAL_LOAD,
        data: dictionary
    }
}

export function addItem(dictionaryItem: DictionaryItem) {
    return {
        type: ADD_ITEM,
        item: dictionaryItem
    }
}

export function removeItem(dictionaryItem: DictionaryItem) {
    return {
        type: REMOVE_ITEM,
        item: dictionaryItem
    }
}


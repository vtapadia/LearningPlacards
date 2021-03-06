import { data } from "../../assets/data/DictionaryManager";
import { DictionaryItem } from "../../types";
import { ActionTypes, AddItemAction, ADD_ITEM, RemoveItemAction, REMOVE_ITEM } from "../actions/actionTypes";

const initialState = {
    data: Array.of<DictionaryItem>()
}

export type AppState = typeof initialState;

export function dictionaryReducer(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case ADD_ITEM: {
            let addItemAction = action as AddItemAction;
            let itemFound = state.data.filter(i => i.unknown.toLowerCase()==addItemAction.item.unknown.toLowerCase())
            let nState = {...state}
            if (itemFound && itemFound.length>0) {
                //Item found, ignore
                // Maybe update later
            } else {
                nState.data.push(addItemAction.item)
            }
            return nState;
        }
        case REMOVE_ITEM: {
            let removeItemAction = action as RemoveItemAction;
            let nState = {...state}
            let itemsLeft = state.data.filter(i => i.unknown!=removeItemAction.item.unknown)
            nState.data = itemsLeft;
            return nState;
        }
        default: 
            return state;
    }
}
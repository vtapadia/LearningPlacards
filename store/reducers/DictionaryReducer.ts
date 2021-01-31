import { DictionaryItem } from "../../types";
import { ActionTypes } from "../actions/actionTypes";

const initialState = {
    data: Array.of<DictionaryItem>()
}

export type AppState = typeof initialState;

export function dictionaryReducer(state = initialState, action: ActionTypes) {
    switch (action.type) {
        default: 
            return state;
    }
}
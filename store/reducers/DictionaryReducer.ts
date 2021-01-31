import { DictionaryItem } from "../../types";

const initialState = {
    data: Array.of<DictionaryItem>()
}

export type AppState = typeof initialState;

export function dictionaryReducer(state = initialState) {
    
}
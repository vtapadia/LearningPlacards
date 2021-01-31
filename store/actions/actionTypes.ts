import { Dictionary } from "../../types";


export const INITIAL_LOAD = "INITIAL_LOAD";

export interface InitialLoadAction {
    type : typeof INITIAL_LOAD,
    data: Dictionary
}

export type ActionTypes = InitialLoadAction


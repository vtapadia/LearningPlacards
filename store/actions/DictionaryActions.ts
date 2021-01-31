import { Dictionary } from "../../types";


export function initialLoad(dictionary:Dictionary) {
    return {
        type: INITIAL_LOAD,
        data: dictionary
    }

}

export type InitialLoadAction = typeof initialLoad

export const INITIAL_LOAD = "INITIAL_LOAD";

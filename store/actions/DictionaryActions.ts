import { Dictionary } from "../../types";
import { INITIAL_LOAD } from "./actionTypes";


export function initialLoad(dictionary:Dictionary) {
    return {
        type: INITIAL_LOAD,
        data: dictionary
    }

}


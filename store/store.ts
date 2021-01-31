import { createStore } from "redux";
import combineReducer from "./reducers/CombinedReducer";

const appStore = createStore(combineReducer);

export type StoreType = typeof appStore;
export default appStore;

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createStore } from "redux";
import combineReducer, { RootState } from "./reducers/CombinedReducer";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root.v1',
    storage: AsyncStorage,
  }

const persistedReducer = persistReducer<RootState, any>(persistConfig, combineReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export type StoreType = typeof store;

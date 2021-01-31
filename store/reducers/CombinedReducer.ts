import { combineReducers } from 'redux';
import { dictionaryReducer } from "./DictionaryReducer";
import { useSelector, TypedUseSelectorHook } from 'react-redux'

const combineReducer = combineReducers({dictionaryReducer});

export default combineReducer;

export type RootState = ReturnType<typeof combineReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

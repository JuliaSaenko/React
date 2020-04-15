import { combineReducers } from 'redux';
import gistsReducer from "./gists";
import selectedGistReducer from "./selectedGist";



const rootReducer = combineReducers({
    gists: gistsReducer,
    selectedGist: selectedGistReducer,
});

export default rootReducer;

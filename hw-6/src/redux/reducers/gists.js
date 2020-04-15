import {
    FETCH_GISTS_ERROR,
    FETCH_GISTS_REQUEST,
    FETCH_GISTS_SUCCESS,


} from "../actions/gists";


export default function gistsReducer(state = {
    isLoading: false,
    items: [],
    error: null
}, action) {
    switch(action.type) {
        case FETCH_GISTS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true
            };
        case FETCH_GISTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                items: action.payload
            };
        case FETCH_GISTS_ERROR:
            return {
                isLoading: false,
                items: [],
                error: action.payload
            };
        default: return state;
    }

}

import {
    FETCH_GIST_SUCCESS,
    GET_GIST_LANGUAGE,
    FETCH_GIST_REQUEST,
    FETCH_GIST_ERROR,
    SHOW_SELECTED_GIST,
} from "../actions/selectedGist";

export default function selectedGistReducer(state = {
    isGistLoading: false,
    selectedGist: {},
    language: null,
    item: null,
    error: null
}, action) {
    switch(action.type) {
        case SHOW_SELECTED_GIST:
            return {
                ...state,
                selectedGist: action.id
            };
        case GET_GIST_LANGUAGE:
            return {
                ...state,
                language: action.language,
            };
        case FETCH_GIST_REQUEST:
            return {
                ...state,
                error: null,
                isGistLoading: true,
            };
        case FETCH_GIST_SUCCESS:
            return {
                ...state,
                item: action.payload,
                isGistLoading: false
            };
        case FETCH_GIST_ERROR:
            return {
                isGistLoading: false,
                item: null,
                error: action.payload
            };

        default: return state;
    }
}

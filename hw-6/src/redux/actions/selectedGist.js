import axios from 'axios';

export const FETCH_GIST_SUCCESS = 'FETCH_GIST_SUCCESS';
export const FETCH_GIST_REQUEST = 'FETCH_GIST_REQUEST';
export const GET_GIST_LANGUAGE = 'GET_GIST_LANGUAGE';
export const FETCH_GIST_ERROR = 'FETCH_GIST_ERROR';
export const SHOW_SELECTED_GIST = 'SHOW_SELECTED_GIST';

const fetchGistContentSuccess = response => ({
    type: FETCH_GIST_SUCCESS,
    payload: response.data
});

const fetchGistError = error => ({
    type: FETCH_GIST_ERROR,
    payload: error.response
});

const fetchGistRequests = () => ({
    type: FETCH_GIST_REQUEST
});

const getGistLanguage = language => ({
    type: GET_GIST_LANGUAGE,
    language,
});


export function getCurrentGistLanguage(language) {
    return dispatch => dispatch(getGistLanguage(language))
}

export const showSelectedGist = (id) => ({
    type: SHOW_SELECTED_GIST,
    id,
});

export function fetchGistContent(url) {
    return dispatch => {
        dispatch(fetchGistRequests(url));
        axios.get(`${url}`)
            .then(response => dispatch(fetchGistContentSuccess(response)))
            .catch(error => dispatch(fetchGistError(error)))
    }
}

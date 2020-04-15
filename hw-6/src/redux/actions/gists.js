import axios from 'axios';

export const FETCH_GISTS_REQUEST = 'FETCH_GISTS_REQUEST';
export const FETCH_GISTS_SUCCESS = 'FETCH_GISTS_SUCCESS';
export const FETCH_GISTS_ERROR = 'FETCH_GISTS_ERROR';

const fetchGistsRequests = () => ({
    type: FETCH_GISTS_REQUEST
});

const fetchGistsSuccess = (response) => ({
    type: FETCH_GISTS_SUCCESS,
    payload: response.data
});


const fetchGistsError = error => ({
    type: FETCH_GISTS_ERROR,
    payload: error.response
});



export function fetchGists() {
    return dispatch => {
        dispatch(fetchGistsRequests());
        axios.get(`https://api.github.com/gists/public`)
            .then(response => dispatch(fetchGistsSuccess(response)))
            .catch(error => dispatch(fetchGistsError(error)))
    }
}

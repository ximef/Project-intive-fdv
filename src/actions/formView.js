// @ constants
const actionTypes = require('../constants/actionTypes');
const {
    apiCountries
} = require('../constants/constants');

const setTextForm = (name, surname, country, birthday) => ({
    type: actionTypes.FORM_VIEW_SET_TEXT,
    payload: {
        name,
        surname,
        country,
        birthday
    }
});

const saveForm = (name, surname, country, birthday) => ({
    type: actionTypes.FORM_VIEW_SAVE,
    payload: {
        name,
        surname,
        country,
        birthday
    }
});

const getCountryError = () => ({
    type: actionTypes.FORM_VIEW_COUNTRIES_ERROR
});

const getCountrySuccess = (data) => ({
    type: actionTypes.FORM_VIEW_COUNTRIES_SUCCESS,
    payload: data
});

const getCountryFetch = () => ({
    type: actionTypes.FORM_VIEW_COUNTRIES_FETCH
});

const getCountry = () => (dispatch) => {
    dispatch(getCountryFetch());
    fetch(apiCountries)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok");
    })
    .then(json => {
        dispatch(getCountrySuccess(json));
    })
    .catch(error => {
        dispatch(getCountryError(error));
    });
};

module.exports = {
    getCountry,
    saveForm,
    setTextForm
};

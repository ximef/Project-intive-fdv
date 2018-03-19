// @vendors
const Immutable = require('immutable');

// @ constants
const actionTypes = require('../constants/actionTypes');

// @utilities
const { capitalize } = require('../utilities/utilities');
const { localStorage } = require('../utilities/localStorage/localStorage');

const initialState = () => {
    return Immutable.fromJS({
        records: [],
        formData: {
            name: "",
            surname: "",
            country: "",
            birthday: "",
            complete: false
        },
        countries: {},
        isFetching: false,
        error: false,
        success: false
    });
};

function getCountry(data) {
    return data.map(country => country.name);
};

function setRecord(name, surname, country, birthday, state) {
    let records = state.get('records');
    localStorage.set(`revisited-${localStorage.getLength()}`, {name, surname, country, birthday});

    return records.push({name, surname, country, birthday});
};

const formView = (state = initialState(), action) => {
    switch (action.type) {
        case actionTypes.FORM_VIEW_COUNTRIES_FETCH:
            return state.merge({
                isFetching: true
            });
        case actionTypes.FORM_VIEW_COUNTRIES_SUCCESS:
            return state.merge({
                countries: getCountry(action.payload),
                success: true,
                isFetching: false
            });
        case actionTypes.FORM_VIEW_COUNTRIES_ERROR:
            return state.merge({
                isFetching: false,
                error: true
            });
        case actionTypes.FORM_VIEW_SAVE:
            return state.merge({
                formData: {
                    name: capitalize(action.payload.name),
                    surname: capitalize(action.payload.surname),
                    country: action.payload.country,
                    birthday: new Date(action.payload.birthday),
                    complete: true
                },
                records: setRecord(action.payload.name, action.payload.surname, 
                    action.payload.country, action.payload.birthday, state)
            });
        case actionTypes.FORM_VIEW_SET_TEXT:
            return state.merge({
                formData: {
                    name: capitalize(action.payload.name),
                    surname: capitalize(action.payload.surname),
                    country: action.payload.country,
                    birthday: new Date(action.payload.birthday),
                    complete: true
                }
            });
        default:
            return state;
    }
};

module.exports = formView;
  
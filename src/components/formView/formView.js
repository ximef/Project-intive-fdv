import './formView.scss';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ClassNames from 'classnames';

//@ Components
import InputLabelText from '../../components/inputLabel/inputLabelText/inputLabelText';
import InputLabelDate from '../../components/inputLabel/inputLabelDate/inputLabelDate';
import InputLabelSelect from '../../components/inputLabel/inputLabelSelect/inputLabelSelect';

//@ Actions
import ActionsFormView from '../../actions/formView';

// @utilities
const { translateText, injectString } = require('../../utilities/utilities');

//@ Constants
const {
    FORMAT_DATE,
    MONTH_NAMES
} = require('../../constants/constants');

class FormView extends React.Component {

    constructor(props) {
        super(props);

        this.buildForm = this.buildForm.bind(this);
        this.buildText = this.buildText.bind(this);
        this.handleOnClickSubmit = this.handleOnClickSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCountry();
    }

    handleOnClickSubmit(event) {
        const { saveForm } = this.props;
        event.preventDefault();

        const name = event.target[0].defaultValue;
        const surname = event.target[1].defaultValue;
        const country = event.target[2].value;
        const birthday = event.target[3].value;

        saveForm(name, surname, country, birthday);
    }

    buildForm() {
        const { immFormView, saveForm } = this.props;
        const name = translateText("formView.name");
        const placeholderName = translateText("formView.placeholderName");
        const surname = translateText("formView.surname");
        const placeholderSurname = translateText("formView.placeholderSurname");
        const countries = translateText("formView.countries");
        const birthday = translateText("formView.birthday");
        const save = translateText("formView.save");

        return(
            <form id="myForm" className="form-view" onSubmit={this.handleOnClickSubmit}>
                <div className="form-view__row">
                    <InputLabelText
                        labelText={name}
                        placeholder={placeholderName}
                    />
                </div>
                <div className="form-view__row">
                    <InputLabelText
                        labelText={surname}
                        placeholder={placeholderSurname}
                    />
                </div>
                <div className="form-view__row">
                    <InputLabelSelect
                        labelText={countries}
                        options={immFormView.get('countries')}
                    />
                </div>
                <div className="form-view__row">
                    <InputLabelDate
                        labelText={birthday}
                        placeholder="mm/dd/yyyy"
                        formatInput={FORMAT_DATE}
                    />
                </div>
                <div className="form-view__row">
                    <InputLabelText
                        labelText={save}
                        type="submit"
                    />
                </div>
            </form>
        );
    }

    buildText() {
        const { immFormView } = this.props;
        const complete = immFormView.getIn(['formData', 'complete']);
        let text;

        if(complete) {
            const name = immFormView.getIn(['formData', 'name']);
            const surname = immFormView.getIn(['formData', 'surname']);
            const completeName = `${name} ${surname}`;
            const country = immFormView.getIn(['formData', 'country']);
            const today = new Date();
            const birthday = immFormView.getIn(['formData', 'birthday']);
            const day = birthday.getUTCDate();
            const month = translateText(`monthNames.${MONTH_NAMES[birthday.getUTCMonth()]}`);
            const years = today.getFullYear() - birthday.getFullYear();
            
            const inject = [ completeName, country, day, month, years ];
            text = injectString(translateText("formView.text"), inject);
        }
        
        const classNameComplete = ClassNames ({
            '--complete': complete,
        });

        return (
            <p className={`form-view__text${classNameComplete}`}>{text}</p>
        );
    }

    render() {
        const buildForm = this.buildForm();
        const buildText = this.buildText();

        return (
            <section>
                {buildForm}
                {buildText}
            </section>
        );
    }
}

FormView.PropTypes = {
    immFormView: PropTypes.object,
    setInit: PropTypes.func,
    saveForm: PropTypes.func
}

module.exports.constructor = FormView;
module.exports.FormView = connect(
    state => ({
        immFormView: state.formView
    }),
    dispatch => ({
        getCountry: bindActionCreators(ActionsFormView.getCountry, dispatch),
        saveForm: bindActionCreators(ActionsFormView.saveForm, dispatch),
    })
)(FormView);
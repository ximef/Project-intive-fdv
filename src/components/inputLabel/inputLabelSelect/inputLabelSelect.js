import '../inputLabel.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class InputLabelSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    buildSelectOption() {
        const { options } = this.props;

        return options.map((item, index) =>
            <option key={index}>{item}</option>
        )
        
    }

    createInputSelect() {
        const buildSelectOption = this.buildSelectOption();
        return (
            <div className="inputLabel__col--right col-2-row__right">
                <select className="inputLabel__input">
                    {buildSelectOption}
                </select>
            </div>
        );
    }

    createLabel() {
        const { labelText } = this.props;
        return (
            <div className="inputLabel__col--left col-2-row__left">
                <label className="inputLabel__label">{labelText}:</label>
            </div>
        );
    }

    render() {
        const { labelText } = this.props;
        const createLabel = this.createLabel();
        const input = this.createInputSelect();

        return (
            <div className="inputLabel row">
                {createLabel}
                {input}
            </div>
        );
    }
}

InputLabelSelect.PropTypes = {
    labelText: PropTypes.string.isRequired,
    options: PropTypes.array,
    type: PropTypes.string
}

export default InputLabelSelect;
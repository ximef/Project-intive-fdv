import '../inputLabel.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class InputLabelDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.inputText
        };

        this.handleChange = this.handleChange.bind(this);
    }
    

    handleChange(e){
        const { formatInput } = this.props;
        const value = (e.target.value.length == 2 || 
                      e.target.value.length == 5) &&
                      this.state.input.length <= e.target.value.length ? 
                      e.target.value + "/" : 
                      e.target.value;
        if(formatInput.test(e.target.value)) {
            this.setState({ input: value });
        } else {
            this.setState({ input: this.state.input})
        }
    }

    createInputDate() {
        return (
            <div className="inputLabel__col--right col-2-row__right">
                <input 
                    type="textDate"
                    className="inputLabel__input"
                    value={this.state.input} 
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    required
                />
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
        const input = this.createInputDate();

        return (
            <div className="inputLabel row">
                {createLabel}
                {input}
            </div>
        );
    }
}

InputLabelDate.PropTypes = {
    labelText: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    formatInput: PropTypes.string.isRequired,
}

export default InputLabelDate;
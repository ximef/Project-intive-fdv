import '../inputLabel.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class InputLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.inputText
        };

        this.handleChange = this.handleChange.bind(this);
    }
    

    handleChange(e){
        const { inputText } = this.props;
        this.setState({ input: e.target.value });
    }

    createInputText(type) {
        return (
            <div className="inputLabel__col--right col-2-row__right">
                <input 
                    type={type} 
                    className="inputLabel__input"
                    value={this.state.input} 
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    required
                />
            </div>
        );
    }

    createInputSubmit(type) {
        return (
            <div className="inputLabel__col--right col-2-row__right">
                <input 
                    type={type}
                    className="inputLabel__input"
                    value={this.props.labelText}
                    onClick={this.props.onClick}
                />
            </div>
        );
    }

    render() {
        const { labelText, inputText, type } = this.props;
        const typeSubmit = this.props.type == 'submit' ? true : false;
        
        let label, input;
        let submit = ClassNames ({
            'inputLabel__submit': typeSubmit,
        });

        switch(type) {
            case "text":
                input = this.createInputText(type);
                break;
            case "submit":
                input = this.createInputSubmit(type);
                break;
            default:
                input = this.createInputText(type);
        }

        if(!typeSubmit) {
            label = (
                <div className="inputLabel__col--left col-2-row__left">
                    <label className="inputLabel__label">{labelText}:</label>
                </div>
            );
        }

        return (
            <div className={`inputLabel ${submit} row`}>
                {label}
                {input}
            </div>
        );
    }
}

InputLabel.PropTypes = {
    labelText: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    formatInput: PropTypes.string,
    type: PropTypes.string
}

InputLabel.defaultProps = {
    type: "text"    
}

export default InputLabel;
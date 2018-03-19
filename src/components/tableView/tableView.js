import './tableView.scss';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

//@ Actions
import ActionsFormView from '../../actions/formView';

// @utilities
const { translateText } = require('../../utilities/utilities');

class TableView extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    buildHeader() {
        const name = translateText("tableView.name");
        const country = translateText("tableView.country");
        const birthday = translateText("tableView.birthday");

        return (
            <tr className="table-view__header">
                <th className="table-view__header--name">{name}</th>
                <th className="table-view__header--country">{country}</th>
                <th className="table-view__header--birthday">{birthday}</th>
            </tr>
        );
    }

    handleClick(item) {
        this.props.setTextForm(item.name,item.surname,item.country,item.birthday);
    }

    buildContentTable() {
        const { immFormView } = this.props;
       
        return (
            immFormView.get('records').map((item, index) => 
                <tr key={index} onClick={() => this.handleClick(item)}>
                    <td>{item.name} {item.surname}</td>
                    <td>{item.country}</td>
                    <td>{item.birthday}</td>
                </tr>
            )
        );
    }

    buildTable() {
        const buildHeader = this.buildHeader();
        const buildContentTable = this.buildContentTable();

        return(
            <table className="table-view__content">
                {buildHeader}
                {buildContentTable}
            </table>
        );
    }

    render() {
        const buildTable = this.buildTable();

        return (
            <section className="table-view">
                {buildTable}
            </section>
        );
    }
}

TableView.PropTypes = {
    immFormView: PropTypes.object,
    setTextForm: PropTypes.func
}

module.exports.constructor = TableView;
module.exports.TableView = connect(
    state => ({
        immFormView: state.formView
    }),
    dispatch => ({
        setTextForm: bindActionCreators(ActionsFormView.setTextForm, dispatch),
    })
)(TableView);

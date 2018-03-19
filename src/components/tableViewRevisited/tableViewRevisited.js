import './tableViewRevisited.scss';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// @utilities
const { localStorage } = require('../../utilities/localStorage/localStorage');

//@ Actions
import ActionsFormView from '../../actions/formView';

// @utilities
const { translateText } = require('../../utilities/utilities');

class TableViewRevisited extends React.Component {

    constructor(props) {
        super(props);
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

    buildContentTable() {
        let keys = [];
        for (let key in localStorage.getAll()) {      
            if (localStorage.getAll().hasOwnProperty(key)) keys.push(key);
        }

        for (let i=0; i<keys.length; i++) {
            console.log(keys[i], localStorage.getAll()[keys[i]]);
        }

        return (
            keys.map((item, index) => 
                <tr key={index}>
                    <td>{localStorage.getAll()[keys[index]].name} {localStorage.getAll()[keys[index]].surname}</td>
                    <td>{localStorage.getAll()[keys[index]].country}</td>
                    <td>{localStorage.getAll()[keys[index]].birthday}</td>
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

module.exports = TableViewRevisited;

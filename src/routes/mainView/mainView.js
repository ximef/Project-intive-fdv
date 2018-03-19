import './mainView.scss';
import React from 'react';
import { FormView } from '../../components/formView/formView';
import { TableView } from '../../components/tableView/tableView';
import { Link } from 'react-router-dom';
const { localStorage } = require('../../utilities/localStorage/localStorage');

//@ Constants
const {
    andLink
} = require('../../constants/constants');

class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: "eng"
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(lang) {
        localStorage.set("language", lang);
        this.setState({ lang: lang });
    }

    render() {
        const local = this.state.lang;
        return (
            <div className="main-view">
                <header className="main-view__header">
                    <div className="link--top">
                        <Link to="/" onClick={() => this.handleClick("eng")}>ENG</Link>
                        {andLink} 
                        <Link to="/" onClick={() => this.handleClick("es")}>ES</Link>
                        {andLink} 
                        <Link to="/" onClick={() => this.handleClick("port")}>PORT</Link>
                    </div>
                    <h2>Intive - FDV Exercise</h2>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2-row">
                            <FormView local={local}/>
                        </div>
                        <div className="col-2-row">
                            <TableView local={local}/>
                        </div>
                    </div>
                </div>
                <footer className="main-view__footer">
                    <a>Ximena Fuertes</a>
                </footer>
            </div>
        );
    }
}

export default MainView;

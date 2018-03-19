import './index.scss';
import React from 'react';
import { Route, Link } from 'react-router-dom';
import MainView from './mainView/mainView';
import Revisited from './revisited/revisited';

//@ Constants
const {
    andLink
} = require('../constants/constants');

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <Route exact path="/" component={MainView} />
            <Route path="/rev" component={Revisited} />
            <div className="link">
                <Link to="/">Home</Link>
                {andLink} 
                <Link to="/rev">Revisited</Link>
            </div>
        </div>
    )
    }
};

export default App;

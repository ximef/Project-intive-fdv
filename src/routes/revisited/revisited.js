import './revisited.scss';
import React from 'react';
import TableViewRevisited from '../../components/tableViewRevisited/tableViewRevisited';

class Revisited extends React.Component {
    render() {
        return (
            <div className="revisited">
                <header className="revisited__header">
                    <h2>Intive - FDV Exercise</h2>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <TableViewRevisited />
                    </div>
                </div>
                <footer className="revisited__footer">
                    <a>Ximena Fuertes</a>
                </footer>
            </div>
        );
    }
}

export default Revisited;

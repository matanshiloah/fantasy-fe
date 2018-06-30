import React from 'react';
import { Table } from 'react-bootstrap';
import '../../styles/style.css';

var Utils = require('../../utils/utils');
var Config = require('../../utils/config');

export default class LeagueTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            table: null
        };

        this.userID = Utils.parseInt(props.userID);

        this._fetchTable();
    }

    _fetchTable() {
        Utils.fetchFromAPI(`${ Config.baseUrl }/table`, 'GET', response => {
            this.setState({
                table: response
            });
        });
    }

    render() {
        if (!this.state.table) {
            return <div />;
        }

        return (
            <div className='table-leagueTable'>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.table.map((team, index) => 
                                <tr key={ index } className={ team.id === this.userID ? 'table-leagueTable--userRow' : '' }>
                                    <td>{ index + 1 }</td>
                                    <td>{ team.name }</td>
                                    <td>{ team.agg_points }</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}
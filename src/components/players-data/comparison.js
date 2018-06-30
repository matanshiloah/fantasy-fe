import React from 'react';
import { Panel, Button, Table } from 'react-bootstrap';
import '../../styles/style.css';

var Utils = require('../../utils/utils');
var Config = require('../../utils/config');

export default class Comparison extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player1: null,
            player2: null
        };

        this.player1ID = props.player1ID;
        this.player2ID = props.player2ID;
        this.onBackToList = props.onBackToList;

        this._getPlayersStats();
    }

    _getPlayersStats() {
        Utils.fetchFromAPI(`${ Config.baseUrl }/player/${ this.player1ID }`, 'GET', response => {
            this.setState({
                player1: response
            });

            Utils.fetchFromAPI(`${ Config.baseUrl }/player/${ this.player2ID }`, 'GET', response => {
                this.setState({
                    player2: response
                });
            });
        });
    }

    _getPlayerImage(player) {
        return `url(/images/players/player_${ player.id }.png)`;
    }

    _getPlayerTitle(player) {
        return `${ Utils.trimPlayerName(player.name) } (${ player.position })`;
    }

    render() {
        if (!this.state.player1 || !this.state.player2) {
            return <div />;
        }

        return (
            <div className='playersData-comparison'>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title className='playersData-comparison--title'>
                            <p className='playersData-comparison--title-name'>{ `${ this._getPlayerTitle(this.state.player1) } vs. ${ this._getPlayerTitle(this.state.player2) }` }</p>
                            <Button bsStyle='primary' className='playersData-comparison--title-back' onClick={ this.onBackToList }>
                                Back to full list
                            </Button>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Table striped condensed hover>
                            <thead>
                                <tr>
                                    <th className='playersData-comparison--table'></th>
                                    <th className='playersData-comparison--table'>
                                        <div className='playersData-comparison--table-image' style={{ backgroundImage: `url(/images/players/player_${ this.state.player1.id }.png)` }}></div>
                                        <div>{ this.state.player1.name }</div>
                                    </th>
                                    <th className='playersData-comparison--table'>
                                        <div className='playersData-comparison--table-image' style={{ backgroundImage: `url(/images/players/player_${ this.state.player2.id }.png)` }}></div>
                                        <div>{ this.state.player2.name }</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='playersData-comparison--table'>
                                <tr>
                                    <td>Price</td>
                                    <td>{ this.state.player1.price }$</td>
                                    <td>{ this.state.player2.price }$</td>
                                </tr>
                                <tr>
                                    <td>Total points</td>
                                    <td>{ this.state.player1.agg_points }</td>
                                    <td>{ this.state.player2.agg_points }</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}
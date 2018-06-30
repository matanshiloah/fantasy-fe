import React from 'react';
import Position from './position';
import '../../styles/style.css';

var Utils = require('../../utils/utils');
var Config = require('../../utils/config');

export default class Team extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortedPlayers: null,
            captain: -1
        };

        this.players = props.players;
        this.onPlayerSelected = props.onPlayerSelected;
        this.onPlayerRemoved = props.onPlayerRemoved;
        this.teamOnField = this.players;
        this._bindedIsTeamCaptain = this._isTeamCaptain.bind(this);
    }

    componentDidMount() {
        this._onPlayersChange();
    }

    componentWillReceiveProps(nextProps) {
        this.teamOnField = nextProps.players;
        this._onPlayersChange(this._isCaptainOnField());
    }

    isPlayerOnField(playerID) {
        return this.teamOnField.filter(player => player.id === playerID).length === 1;
    }

    isTeamFull() {
        return this.teamOnField.length === 11;
    }

    isPositionFull(position) {
        if (position === 'GK') {
            return this.state.sortedPlayers.gk.length === 1;
        }

        if (position === 'FW') {
            return this.state.sortedPlayers.fw.length === 3;
        }

        return this.state.sortedPlayers[position.toLowerCase()].length === 5;
    }

    isSameTeamCapReached(teamID) {
        return this.teamOnField.filter(player => player.team === teamID).length === Config.teamCap;
    }

    setTeamCaptain(playerID) {
        this.setState({
            captain: playerID
        });
    }

    isTeamValid() {
        return this.isTeamFull() && this.state.sortedPlayers.gk.length > 0 && this.state.sortedPlayers.fw.length > 0 && this._isCaptainOnField();
    }

    _onPlayersChange(isCaptainOnField) {
        var sortedPlayers = Utils.sortPlayersByPosition(this.teamOnField);

        this.setState({
            sortedPlayers: sortedPlayers,
            captain: isCaptainOnField ? this.state.captain : -1
        });
    }

    _isTeamEmpty() {
        return Object.keys(this.state.sortedPlayers).filter(position => this.state.sortedPlayers[position].length > 0).length === 4;
    }

    _isTeamCaptain(playerID) {
        return this.state.captain === playerID;
    }

    _isCaptainOnField() {
        return this.teamOnField.filter(player => this._isTeamCaptain(player.id)).length === 1;
    }

    render() {
        if (!this.state.sortedPlayers || this._isTeamEmpty()) {
            return <div className='team-team' />;
        }

        return (
            <div className='team-team'>
                {
                    Object.keys(this.state.sortedPlayers).map((position, index) =>
                        <Position key={ index } position={ position } players={ this.state.sortedPlayers[position] } onPlayerSelected={ this.onPlayerSelected } onPlayerRemoved={ this.onPlayerRemoved } isTeamCaptain={ this._bindedIsTeamCaptain } />
                    )
                }
            </div>
        );
    }
}
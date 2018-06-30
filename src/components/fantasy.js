import React from 'react';
import Team from './team/team';
import Data from './players-data/data';
import LeagueTable from './table/league-table';
import { Well } from 'react-bootstrap';
import '../styles/style.css';

var Utils = require('../utils/utils');
var Config = require('../utils/config');

export default class Fantasy extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamData: null
        };

        this.userID = props.userID;
        
        this.teamRef = null;
        this.playersDataRef = null;

        this._fetchTeamData();

        this._bindedOnFieldPlayerSelected = this._onFieldPlayerSelected.bind(this);
        this._bindedOnPlayerAdded = this._onPlayerAdded.bind(this);
        this._bindedOnPlayerRemoved = this._onPlayerRemoved.bind(this);
        this._bindedIsPlayerOnField = this._isPlayerOnField.bind(this);
        this._bindedIsPositionFull = this._isPositionFull.bind(this);
        this._bindedIsTeamFull = this._isTeamFull.bind(this);
        this._bindedIsSameTeamCapReached = this._isSameTeamCapReached.bind(this);
        this._bindedOnSetTeamCaptain = this._onSetTeamCaptain.bind(this);
    }

    _fetchTeamData() {
        Utils.fetchFromAPI(`${ Config.baseUrl }/users/${ this.userID }`, 'GET', response => {
            this.setState({
                teamData: response
            });
        });
    }
    
    _onPlayerAdded(player) {
        var teamData = this.state.teamData;

        teamData.players.push(player);

        this.setState({
            teamData: teamData
        });
    }

    _onPlayerRemoved(playerID) {
        var teamData = this.state.teamData;

        for (var i = 0; i < teamData.players.length; i++) {
            if (teamData.players[i].id === playerID) {
                teamData.players.splice(i, 1);
                break;
            }
        }

        this.setState({
            teamData: teamData
        });
    }

    _printPlace() {
        var suffixes = {
            1: 'st',
            2: 'nd',
            3: 'rd',
            others: 'th'
        };

        var digit = this.state.teamData.team.place % 10;

        return `${ this.state.teamData.team.place }${ suffixes.hasOwnProperty(digit) ? suffixes[digit] : suffixes.others } place`;
    }

    _isPlayerOnField(playerID) {
        return this.teamRef ? this.teamRef.isPlayerOnField(playerID) : false;
    }

    _isTeamFull() {
        return this.teamRef ? this.teamRef.isTeamFull() : false;
    }

    _isPositionFull(position) {
        return this.teamRef ? this.teamRef.isPositionFull(position) : false;
    }

    _isSameTeamCapReached(teamID) {
        return this.teamRef ? this.teamRef.isSameTeamCapReached(teamID) : false;
    }

    _onSetTeamCaptain(playerID) {
        if (this.teamRef) {
            this.teamRef.setTeamCaptain(playerID);
        }
    }

    _onFieldPlayerSelected(playerID) {
        if (this.playersDataRef) {
            this.playersDataRef.onFieldPlayerSelected(playerID);
        }
    }

    render() {
        if (!this.state.teamData) {
            return <div />;
        }

        return (
            <div className='fantasy'>
                <div className='fantasy-user'>
                    <Well bsSize='small' className='fantasy-user-teamName'>
                        { this.state.teamData.team.name }
                    </Well>
                    <Well bsSize='small' className='fantasy-user-username'>
                        { this.state.teamData.team.username }
                    </Well>
                    <Well bsSize='small' className='fantasy-user-place'>
                        { this._printPlace() }
                    </Well>
                </div>
                <div className='fantasy-container'>
                    <Team ref={ ref => { this.teamRef = ref; } } players={ this.state.teamData.players } onPlayerSelected={ this._bindedOnFieldPlayerSelected } onPlayerRemoved={ this._bindedOnPlayerRemoved } />
                    <Data ref={ ref => { this.playersDataRef = ref; } } onPlayerAdded={ this._bindedOnPlayerAdded } onPlayerRemoved={ this._bindedOnPlayerRemoved } isPlayerOnField={ this._bindedIsPlayerOnField } isTeamFull={ this._bindedIsTeamFull } isPositionFull={ this._bindedIsPositionFull } isSameTeamCapReached={ this._bindedIsSameTeamCapReached } setAsTeamCaptain={ this._bindedOnSetTeamCaptain } />
                    <LeagueTable userID={ this.userID } />
                </div>
            </div>
        );
    }
}
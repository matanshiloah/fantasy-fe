import React from 'react';
import Filters from './filters';
import PlayersTabs from './players-tabs';
import Comparison from './comparison';
import Player from './player';
import '../../styles/style.css';

var PlayersDataFetcher = require('../../utils/playersDataFetcher');

export default class Data extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPlayer: null,
            comparison: { 
                player1: null, 
                player2: null 
            }
        };

        this.playersTabs = null;
        this.playersDataFetcher = new PlayersDataFetcher();

        this.onPlayerAdded = props.onPlayerAdded;
        this.onPlayerRemoved = props.onPlayerRemoved;
        this.isPlayerOnField = props.isPlayerOnField;
        this.isTeamFull = props.isTeamFull;
        this.isPositionFull = props.isPositionFull;
        this.isSameTeamCapReached = props.isSameTeamCapReached;
        this.setAsTeamCaptain = props.setAsTeamCaptain;

        this._bindedOnPlayerSelected = this._onPlayerSelected.bind(this);
        this._bindedOnBackToList = this._onBackToList.bind(this);
        this._bindedOnComparingPlayer = this._onComparingPlayer.bind(this);
        this._bindedIsComparingPlayer = this._isComparingPlayer.bind(this);
        this._bindedIsComparisonMode = this._isComparisonMode.bind(this);
        this._bindedOnFilterChange = this._onFilterChange.bind(this);
    }

    onFieldPlayerSelected(playerID) {
        this.playersDataFetcher.fetch(playerID, this._bindedOnPlayerSelected);
    }

    _onPlayerSelected(player) {
        this.setState({
            selectedPlayer: player
        });
    }

    _onBackToList() {
        this.setState({
            selectedPlayer: null,
            comparison: {
                player1: null,
                player2: null
            }
        });
    }

    _onComparingPlayer(playerID) {
        if (this.state.comparison.player1 === playerID) {
            this._onBackToList();

            return;
        }

        var comparison = {
            player1: this.state.comparison.player1 || playerID,
            player2: this.state.comparison.player1 ? playerID : null
        };

        this.setState({
            comparison: comparison
        });
    }

    _isComparingPlayer(playerID) {
        return this._isComparisonMode() && this.state.comparison.player1 === playerID;
    }

    _isComparisonMode() {
        return this.state.comparison.player1;
    }

    _onFilterChange(newFilters) {
        if (this.playersTabs) {
            this.playersTabs.setNewFilter(newFilters);
        }
    }

    render() {
        return (
            <div className='playersData-data'>
                <Filters onFilterChange={ this._bindedOnFilterChange } />
                <div className='playersData-data--main'>
                    {
                        this.state.comparison.player1 !== null && this.state.comparison.player2 !== null ?
                            <Comparison player1ID={ this.state.comparison.player1 } player2ID={ this.state.comparison.player2 } onBackToList={ this._bindedOnBackToList } />
                        : this.state.selectedPlayer === null ?
                            <PlayersTabs ref={ ref => { this.playersTabs = ref; } } onPlayerSelected={ this._bindedOnPlayerSelected } onPlayerAdded={ this.onPlayerAdded } onPlayerRemoved={ this.onPlayerRemoved } isPlayerOnField={ this.isPlayerOnField } isTeamFull={ this.isTeamFull } isPositionFull={ this.isPositionFull } isSameTeamCapReached={ this.isSameTeamCapReached } onComparingPlayer={ this._bindedOnComparingPlayer } isComparingPlayer={ this._bindedIsComparingPlayer } isComparisonMode={ this._bindedIsComparisonMode } />
                        :
                            <Player player={ this.state.selectedPlayer } onBackToList={ this._bindedOnBackToList } isPlayerOnField={ this.isPlayerOnField } onPlayerRemoved={ this.onPlayerRemoved } setAsTeamCaptain={ this.setAsTeamCaptain } onPlayerAdded={ this.onPlayerAdded } />
                    }
                </div>
            </div>
        );
    }
}
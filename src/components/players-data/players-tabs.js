import React from 'react';
import PlayerItem from './player-item';
import { Tabs, Tab } from 'react-bootstrap';
import '../../styles/style.css';

var PlayersDataFetcher = require('../../utils/playersDataFetcher');
var Utils = require('../../utils/utils');
var Config = require('../../utils/config');

export default class PlayersLists extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            playersByPosition: null,
            filters: {
                selectedTeam: 0,
                maxPrice: Config.maxPrice,
                sortBy: Config.sortByOptions[0].field
            }
        };
        
        this.playersByPosition = null;
        this.playersDataFetcher = new PlayersDataFetcher();
        
        this._fetchPlayersList();

        this.filters = props.filters;
        this.onPlayerSelected = props.onPlayerSelected;
        this.onPlayerAdded = props.onPlayerAdded;
        this.onPlayerRemoved = props.onPlayerRemoved;
        this.isPlayerOnField = props.isPlayerOnField;
        this.isTeamFull = props.isTeamFull;
        this.isPositionFull = props.isPositionFull;
        this.isSameTeamCapReached = props.isSameTeamCapReached;
        this.onComparingPlayer = props.onComparingPlayer;
        this.isComparingPlayer = props.isComparingPlayer;
        this.isComparisonMode = props.isComparisonMode;
        this._bindedFetchSelctedPlayer = this._fetchSelctedPlayer.bind(this);
    }

    setNewFilter(newFilters) {
        this.setState({
            playersByPosition: newFilters.hasOwnProperty('sortBy') && newFilters.sortBy !== this.state.filters.sortBy ? this._sortPlayersByFilter(newFilters.sortBy) : this.state.playersByPosition,
            filters: Object.assign(this.state.filters, newFilters)
        });
    }

    _sortPlayersByFilter(filter) {
        for (var position in this.playersByPosition) {
            this.playersByPosition[position] = Utils.sortArrayByKey(this.playersByPosition[position], filter);
        }

        return this.playersByPosition;
    }

    _fetchPlayersList() {
        Utils.fetchFromAPI(`${ Config.baseUrl }/players`, 'GET', response => {
            this.playersByPosition = Utils.sortPlayersByPosition(response);
            this.playersByPosition = this._sortPlayersByFilter(this.playersByPosition, this.state.filters.sortBy);

            this.setState({
                playersByPosition: this.playersByPosition
            });
        });
    }

    _fetchSelctedPlayer(playerID) {
        this.playersDataFetcher.fetch(playerID, this.onPlayerSelected);
    }

    _isPlayerFilteredIn(player) {
        if (this.state.filters.selectedTeam !== 0 && player.team !== this.state.filters.selectedTeam) {
            return false;
        }

        if (this.state.filters.maxPrice !== Config.maxPrice && player.price > this.state.filters.maxPrice) {
            return false;
        }

        return true;
    }

    render() {
        if (!this.playersByPosition) {
            return <div />;
        }

        return (
            <div className='playersData-playersTabs'>
                <Tabs id='playersData-playersTabs'>
                    {
                        Object.keys(this.state.playersByPosition).reverse().map((position, index) => 
                            <Tab key={ index } eventKey={ index + 1 } title={ `${ Utils.translatePositons(position) }s` }>
                                <div className='playersData-playersTabs--tab'>
                                    {
                                        this.state.playersByPosition[position].map(player => 
                                            this._isPlayerFilteredIn(player) ?
                                                <PlayerItem key={ player.id } player={ player } onPlayerSelected={ this._bindedFetchSelctedPlayer } onPlayerAdded={ this.onPlayerAdded } onPlayerRemoved={ this.onPlayerRemoved } isPlayerOnField={ this.isPlayerOnField } isTeamFull={ this.isTeamFull } isPositionFull={ this.isPositionFull } isSameTeamCapReached={ this.isSameTeamCapReached } onComparingPlayer={ this.onComparingPlayer } isComparingPlayer={ this.isComparingPlayer } isComparisonMode={ this.isComparisonMode } />
                                            : null
                                        )
                                    }
                                </div>
                            </Tab>
                        )
                    }
                </Tabs>
            </div>
        );
    }
}
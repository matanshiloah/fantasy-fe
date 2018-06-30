import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../../styles/style.css';

var PlayersDataFetcher = require('../../utils/playersDataFetcher');
var Utils = require('../../utils/utils');

export default class PlayerItem extends React.Component {
    constructor(props) {
        super(props);

        this.playersDataFetcher = new PlayersDataFetcher();

        this.player = props.player;
        this.onPlayerSelected = props.onPlayerSelected;
        this.onPlayerAdded = props.onPlayerAdded;
        this.onPlayerRemoved = props.onPlayerRemoved;
        this.isPlayerOnField = props.isPlayerOnField;
        this.isPositionFull = props.isPositionFull;
        this.isTeamFull = props.isTeamFull;
        this.isSameTeamCapReached = props.isSameTeamCapReached;
        this.onComparingPlayer = props.onComparingPlayer;
        this.isComparingPlayer = props.isComparingPlayer;
        this.isComparisonMode = props.isComparisonMode;
    }

    _onAddPlayerClicked(playerID) {
        this.playersDataFetcher.fetch(playerID, this.onPlayerAdded);
    }

    _disablePlayer() {
        return this.isTeamFull() || this.isPositionFull(this.player.position) || this.isSameTeamCapReached(this.player.team);
    }

    render() {
        var isPlayerAvailable = !this.isPlayerOnField(this.player.id);
        var isComparisonMode = this.isComparisonMode();
        var isComparingPlayer = isComparisonMode && this.isComparingPlayer(this.player.id);

        return (
            <div className='playersData-playerItem'>
                <div className='playersData-playerItem--image' style={{ backgroundImage: `url(/images/players/player_${ this.player.id }.png)` }}></div>
                <div className='playersData-playerItem--name'>
                    <div className='playersData-playerItem--name-click' onClick={ () => { this.onPlayerSelected(this.player.id) } }>
                        { Utils.trimPlayerName(this.player.name) }
                    </div>
                </div>
                <div className='playersData-playerItem--teamLogo' style={{ backgroundImage: `url(/images/clubs/club_${ this.player.team }.png)` }}></div>
                <div className='playersData-playerItem--price'>{ `${ this.player.price }$` }</div>
                <div className='playersData-playerItem--points'>{ `${ this.player.agg_points } pts` }</div>
                <div className='playersData-playerItem--add'>
                    <OverlayTrigger placement='top' overlay={ <Tooltip id='addRemoveTooltip'>{ isPlayerAvailable ? 'Add player' : 'Remove player' }</Tooltip> }>
                        {
                            isPlayerAvailable ?
                                    <Button bsStyle='success' onClick={ this._onAddPlayerClicked.bind(this, this.player.id) } disabled={ this._disablePlayer() } alt='Add'>+</Button>
                            : 
                                <Button bsStyle='danger' onClick={ this.onPlayerRemoved.bind(this, this.player.id) }>-</Button>
                        }
                    </OverlayTrigger>
                </div>
                <div className='playersData-playerItem--compare'>
                    <OverlayTrigger placement='top' overlay={ <Tooltip id='comparing'>{ isComparisonMode ? (isComparingPlayer ? 'Exit comparison mode' : 'Compare to selected player') : 'Compare player' }</Tooltip> }>
                        <Button bsStyle={ isComparisonMode ? (isComparingPlayer ? 'danger' : 'warning') : 'info' } onClick={ this.onComparingPlayer.bind(this, this.player.id) }>=</Button>
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
}
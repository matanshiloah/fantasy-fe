import React from 'react';
import { Badge } from 'react-bootstrap';
import '../../styles/style.css';

var Utils = require('../../utils/utils');

export default class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player: props.player
        };

        this.onPlayerSelected = props.onPlayerSelected;
        this.onPlayerRemoved = props.onPlayerRemoved;
        this.isTeamCaptain = props.isTeamCaptain;
        this._bindedOnPlayerRemovedClicked = this._onPlayerRemovedClicked.bind(this);
    }

    _onPlayerRemovedClicked(event) {
        event.stopPropagation();
        this.onPlayerRemoved(this.state.player.id);
    }

    render() {
        return (
            <div className='team-player' onClick={ this.onPlayerSelected.bind(this, this.state.player.id) }>
                <Badge className='team-player--remove' onClick={ this._bindedOnPlayerRemovedClicked }>X</Badge>
                <div className='team-player--shirt' style={ { backgroundImage: `url(/images/shirts/team_${ this.state.player.team }.png)` } }></div>
                <Badge className={ `team-player--captain ${ this.isTeamCaptain(this.state.player.id) ? 'show' : 'hide' }` }>C</Badge>
                <div className='team-player--bio'>
                    <Badge className='team-player--bio-badge'>
                        <p className='team-player--bio-badge-name'>{ Utils.trimPlayerName(this.state.player.name) }</p>
                        <p className='team-player--bio-badge-score'>{ this.state.player.curr_points }</p>
                    </Badge>
                </div>
            </div>
        );
    }
}
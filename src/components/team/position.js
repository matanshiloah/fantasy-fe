import React from 'react';
import Player from './player';
import '../../styles/style.css';

export default class Position extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: props.players
        };

        this.position = props.position;
        this.onPlayerSelected = props.onPlayerSelected;
        this.onPlayerRemoved = props.onPlayerRemoved;
        this.isTeamCaptain = props.isTeamCaptain;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            players: nextProps.players
        });
    }

    render() {
        return (
            <div className='team-position'>
                {
                    this.state.players.map(player => 
                        <Player key={ player.id } player={ player } onPlayerSelected={ this.onPlayerSelected } onPlayerRemoved={ this.onPlayerRemoved } isTeamCaptain={ this.isTeamCaptain } />
                    )
                }
            </div>
        );
    }
}
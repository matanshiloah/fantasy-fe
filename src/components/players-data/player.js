import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import '../../styles/style.css';

export default class Player extends React.Component {
    constructor(props) {
        super(props);

        this.player = props.player;
        this.onBackToList = props.onBackToList;
        this.isPlayerOnField = props.isPlayerOnField;
        this.onPlayerRemoved = props.onPlayerRemoved;
        this.setAsTeamCaptain = props.setAsTeamCaptain;
        this.onPlayerAdded = props.onPlayerAdded;
    }

    render() {
        return (
            <div className='playersData-player'>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title className='playersData-player--title'>
                            <span className='playersData-player--title-image' style={{ backgroundImage: `url(/images/players/player_${ this.player.id }.png)` }}></span>
                            <p className='playersData-player--title-name'>{ `${ this.player.name } (${ this.player.position })` }</p>
                            <Button bsStyle='primary' className='playersData-player--title-back' onClick={ this.onBackToList }>
                                Back to full list
                            </Button>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <div className='playersData-player--actions'>
                            <div className={ `playersData-player--actions-makeCaptain ${ this.isPlayerOnField(this.player.id) ? 'show' : 'hide' }` }>
                                <Button bsStyle='primary' onClick={ this.setAsTeamCaptain.bind(this, this.player.id) }>Make captain</Button>
                            </div>
                            <div className={ `playersData-player--actions-remove ${ this.isPlayerOnField(this.player.id) ? 'show' : 'hide' }` }>
                                <Button bsStyle='danger' onClick={ this.onPlayerRemoved.bind(this, this.player.id) }>Remove from team</Button>
                            </div>
                            <div className={ `playersData-player--actions-add ${ !this.isPlayerOnField(this.player.id) ? 'show' : 'hide' }` }>
                                <Button bsStyle='success' onClick={ this.onPlayerAdded.bind(this, this.player) }>Add to team</Button>
                            </div>
                        </div>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}
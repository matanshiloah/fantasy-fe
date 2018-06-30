import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl, Button } from 'react-bootstrap';
import '../../styles/style.css';

var Config = require('../../utils/config');
var Utils = require('../../utils/utils');

export default class Creator extends React.Component {
    constructor(props) {
        super(props);

        this.name = null;
        this.email = null;
        this.password = null;
        this.teamName = null;

        this.onUserCreated = props.onUserCreated;
        this._bindedCreateUser = this._createUser.bind(this);
        this._bindedOnUserCreated = this._onUserCreated.bind(this);
    }

    _createUser() {
        var name = ReactDOM.findDOMNode(this.name).value;
        var email = ReactDOM.findDOMNode(this.email).value;
        var password = Utils.hashPassword(ReactDOM.findDOMNode(this.password).value);

        Utils.fetchFromAPI(`${ Config.baseUrl }/users/create/${ name }/${ email }/${ encodeURIComponent(password) }`, 'GET', this._bindedOnUserCreated);
    }

    _onUserCreated(response) {
        var teamName = ReactDOM.findDOMNode(this.teamName).value;

        Utils.fetchFromAPI(`${ Config.baseUrl }/teams/create/${ response.userID }/${ teamName }`, 'GET', this.onUserCreated);
    }

    render() {
        return (
            <div className='users-creator'>
                <div className='users-creator--name'>
                    <div className='users-creator--name-label'>Name</div>
                    <div className='users-creator--name-input'>
                        <FormControl type='text' placeholder='Name' ref={ ref => { this.name = ref; } } />
                    </div>
                </div>
                <div className='users-creator--email'>
                    <div className='users-creator--email-label'>Email</div>
                    <div className='users-creator--email-input'>
                        <FormControl type='email' placeholder='Email' ref={ ref => { this.email = ref; } } />
                    </div>
                </div>
                <div className='users-creator--password'>
                    <div className='users-creator--password-label'>Password</div>
                    <div className='users-creator--password-input'>
                        <FormControl type='password' placeholder='Password' ref={ ref => { this.password = ref; } } />
                    </div>
                </div>
                <div className='users-creator--teamName'>
                    <div className='users-creator--teamName-label'>Team name</div>
                    <div className='users-creator--teamName-input'>
                        <FormControl type='text' placeholder='Team name' ref={ ref => { this.teamName = ref; } } />
                    </div>
                </div>
                <div className='users-creator--buttons'>
                    <div className='users-creator--buttons-createUser'>
                        <Button bsStyle='primary' onClick={ this._bindedCreateUser }>Create User</Button>
                    </div>
                </div>
            </div>
        );
    }
}
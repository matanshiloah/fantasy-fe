import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl, Checkbox, Button, Alert } from 'react-bootstrap';
import '../../styles/style.css';

var Config = require('../../utils/config');
var Utils = require('../../utils/utils');

export default class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this._validateRememberedUser(props.onLoggedSuccessfully);
        
        this.state = {
            showAlert: false
        };

        this.email = null;
        this.password = null;
        this.rememberMe = false;

        this.onLoggedSuccessfully = props.onLoggedSuccessfully;
        this.onCreateUserClicked = props.onCreateUserClicked;
        this._bindedOnRememberStateChanged = this._onRememberStateChanged.bind(this);
        this._bindedValidateUser = this._validateUser.bind(this);
        this._bindedOnValidationReponse = this._onValidationReponse.bind(this);
        this._bindedToggleAlert = this._toggleAlert.bind(this);
    }

    _validateRememberedUser(onLoggedSuccessfully) {
        var validUserID = window.localStorage.getItem('validUserID');

        if (validUserID) {
            onLoggedSuccessfully(validUserID);
        }
    }

    _validateUser() {
        var email = ReactDOM.findDOMNode(this.email).value;
        var password = Utils.hashPassword(ReactDOM.findDOMNode(this.password).value);

        Utils.fetchFromAPI(`${ Config.baseUrl }/users/validate/${ email }/${ encodeURIComponent(password) }`, 'GET', this._bindedOnValidationReponse);
    }

    _onValidationReponse(response) {
        if (response.status === 'success') {
            this._rememberUser(response.userID);
            this.onLoggedSuccessfully(response.userID);
        } else {
            this._toggleAlert(true);

            this._hideAlertTimeout = clearTimeout(this._hideAlertTimeout);
            this._hideAlertTimeout = setTimeout(this._bindedToggleAlert, 3000, false);
        }
    }

    _toggleAlert(value) {
        this.setState({
            showAlert: value
        });
    }

    _onRememberStateChanged(event) {
        this.rememberMe = event.target.checked;
    }

    _rememberUser(userID) {
        if (this.rememberMe) {
            window.localStorage.setItem('validUserID', userID);
        }
    }

    render() {
        return (
            <div className='users-logIn'>
                <div className='users-logIn--email'>
                    <div className='users-logIn--email-label'>Email</div>
                    <div className='users-logIn--email-input'>
                        <FormControl type='email' placeholder='Email' ref={ ref => { this.email = ref; } } />
                    </div>
                </div>
                <div className='users-logIn--password'>
                    <div className='users-logIn--password-label'>Password</div>
                    <div className='users-logIn--password-input'>
                        <FormControl type='password' placeholder='Password' ref={ ref => { this.password = ref; } } />
                    </div>
                </div>
                <div className='users-logIn--rememberMe'>
                    <Checkbox onChange={ this._bindedOnRememberStateChanged }> Remember me</Checkbox>
                </div>
                <div className='users-logIn--buttons'>
                    <div className='users-logIn--buttons-logIn'>
                        <Button bsStyle='primary' onClick={ this._bindedValidateUser }>Log In</Button>
                    </div>
                    <div className='users-logIn--buttons-createUser'>
                        <Button bsStyle='primary' onClick={ this.onCreateUserClicked }>Create User</Button>
                    </div>
                </div>
                <div className={ `users-logIn--alert ${ this.state.showAlert ? 'show' : 'hide' }` }>
                    <Alert bsStyle='danger'>
                        <h4>Something went wrong</h4>
                    </Alert>
                </div>
            </div>
        );
    }
}
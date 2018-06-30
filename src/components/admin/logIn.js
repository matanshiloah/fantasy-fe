import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl, Button, Alert } from 'react-bootstrap';
import '../../styles/style.css';

var Config = require('../../utils/config');
var Utils = require('../../utils/utils');

export default class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false
        };

        this.username = null;
        this.password = null;

        this.onLoggedSuccessfully = props.onLoggedSuccessfully;
        this._bindedValidateUser = this._validateUser.bind(this);
        this._bindedOnValidationReponse = this._onValidationReponse.bind(this);
        this._bindedToggleAlert = this._toggleAlert.bind(this);
    }

    _validateUser() {
        var username = ReactDOM.findDOMNode(this.username).value;
        var password = Utils.hashPassword(ReactDOM.findDOMNode(this.password).value);

        Utils.fetchFromAPI(`${ Config.baseUrl }/admin/validate/${ username }/${ encodeURIComponent(password) }`, 'GET', this._bindedOnValidationReponse);
    }

    _onValidationReponse(response) {
        if (response.status === 'ok') {
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

    render() {
        return (
            <div className='admin-logIn'>
                <div className='admin-logIn--username'>
                    <div className='admin-logIn--username-label'>Username</div>
                    <div className='admin-logIn--username-input'>
                        <FormControl type='username' placeholder='username' ref={ ref => { this.username = ref; } } />
                    </div>
                </div>
                <div className='admin-logIn--password'>
                    <div className='admin-logIn--password-label'>Password</div>
                    <div className='admin-logIn--password-input'>
                        <FormControl type='password' placeholder='Password' ref={ ref => { this.password = ref; } } />
                    </div>
                </div>
                <div className='admin-logIn--buttons'>
                    <div className='admin-logIn--buttons-logIn'>
                        <Button bsStyle='primary' onClick={ this._bindedValidateUser }>Log In</Button>
                    </div>
                </div>
                <div className={ `admin-logIn--alert ${ this.state.showAlert ? 'show' : 'hide' }` }>
                    <Alert bsStyle='danger'>
                        <h4>Something went wrong</h4>
                    </Alert>
                </div>
            </div>
        );
    }
}
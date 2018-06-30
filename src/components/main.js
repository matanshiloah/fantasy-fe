import React from 'react';
import Fantasy from './fantasy';
import LogIn from './users/logIn';
import Creator from './users/creator';
import '../styles/style.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            done: 0,
            loggedIn: false,
            createUser: false
        };

        this.userID = -1;

        this._bindedOnLoggedSuccessfully = this._onLoggedSuccessfully.bind(this);
        this._bindedOnCreateUserClicked = this._onCreateUserClicked.bind(this);
        this._bindedOnUserCreated = this._onUserCreated.bind(this);
    }

    _onLoggedSuccessfully(userID) {
        this.userID = userID;

        this.setState({
            loggedIn: true
        });
    }

    _onCreateUserClicked() {
        this.setState({
            loggedIn: false,
            createUser: true
        });
    }

    _onUserCreated() {
        this.setState({
            loggedIn: false,
            createUser: false
        });
    }

    render() {
        return (
            <div className='main'>
                {
                    this.state.createUser ?
                        <Creator onUserCreated={ this._bindedOnUserCreated } />
                    :
                        !this.state.loggedIn ?
                            <LogIn onLoggedSuccessfully={ this._bindedOnLoggedSuccessfully } onCreateUserClicked={ this._bindedOnCreateUserClicked } />
                        :
                            <Fantasy userID={ this.userID } /> 
                }
            </div>
        );
    }
}
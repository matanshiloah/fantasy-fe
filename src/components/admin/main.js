import React from 'react';
import LogIn from './logIn';
import Admin from './admin';
import '../../styles/style.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        };

        this._bindedOnLoggedSuccessfully = this.onLoggedSuccessfully.bind(this);
    }

    onLoggedSuccessfully() {
        this.setState({
            loggedIn: true
        });
    }

    render() {
        return (
            <div className='admin-main'>
                {
                    this.state.loggedIn ? 
                        <Admin />
                    :
                        <LogIn onLoggedSuccessfully={ this._bindedOnLoggedSuccessfully } />
                }
            </div>
        );
    }
}
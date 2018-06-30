import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './components/main';
import Admin from './components/admin/main';
import './styles/style.css';

var App = () => {
    return (
        <Switch>
            <Route exact path='/' component={ Main } />
            <Route path='/admin' component={ Admin } />
        </Switch>
    );
}

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));

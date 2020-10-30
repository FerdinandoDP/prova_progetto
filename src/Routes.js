import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import history from './history';
import {Body_firstpage} from './FirstPage/Body_firstpage';
import {Body_secondpage} from './SecondPage/Body_secondpage';
//import {SecondPage} from './SecondPage/SecondPage';
//import {FirstPage} from './FirstPage/FirstPage';

export class Routes extends React.Component{
    render(){
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/articles" component={Body_secondpage} />
                    <Route path="/" exact component={Body_firstpage} /> 
                </Switch>
            </Router>
        )
    }
}
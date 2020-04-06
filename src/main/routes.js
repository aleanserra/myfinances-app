import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import RegisterUsers from '../views/registerUser'
import SearchMoviments from '../views/moviments/searchMoviments'
import RegisterMoviments from '../views/moviments/registerMoviments'

import {Route, Switch, HashRouter} from 'react-router-dom'

function Routes (){
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component= {Home}></Route>
                <Route path="/login" component= {Login}></Route>
                <Route path="/register-users" component= {RegisterUsers}></Route>
                <Route path="/searchMoviments" component= {SearchMoviments}></Route>
                <Route path="/registerMoviments" component= {RegisterMoviments}></Route>
            </Switch>
        </HashRouter>
    )
}

export default Routes
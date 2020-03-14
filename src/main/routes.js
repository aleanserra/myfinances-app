import React from 'react'

import Login from '../views/login'
import RegisterUsers from '../views/registerUser'

import {Route, Switch, HashRouter} from 'react-router-dom'

function Routes (){
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component= {Login}></Route>
                <Route path="/register-users" component= {RegisterUsers}></Route>
            </Switch>
        </HashRouter>
    )
}

export default Routes
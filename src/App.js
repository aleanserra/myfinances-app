import React from 'react';
import Login from './views/login';

import UserRegister from './views/registerUser'

import 'bootswatch/dist/flatly/bootstrap.css'
import './custom.css'

class App extends React.Component{
  render(){
     return(
      <div>
        <UserRegister/>
      </div>
    )
 }
}

export default App;

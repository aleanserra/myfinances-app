import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import {withRouter} from 'react-router-dom'
class Login extends React.Component{

    state = {
        email: '',
        password: ''
    }

    enter = () =>{
        console.log('Email: ', this.state.email);
        console.log('Password: ', this.state.password);
    }

    preparRegister = () =>{
        this.props.history.push('/register-users');
    }

    render(){
        return(
            <div className = "row">
                <div className = "col-md-6" style = {{position : 'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exempleInputEmail1">
                                                <input type="email" 
                                                value={this.state.email}
                                                onChange = {e => this.setState({email: e.target.value})}
                                                className="form-control"
                                                id="exampleInputEmail1" 
                                                aria-describedby="emailHelp"
                                                placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Password: *" htmlFor="exampleInputPassword1">
                                                <input type="password" 
                                                value={this.state.password}
                                                onChange = {e => this.setState({password: e.target.value})}
                                                className="form-control" 
                                                id="exampleInputPassword1" 
                                                placeholder="Password" />
                                            </FormGroup>
                                            <button onClick={this.enter} className="btn btn-success">Sign in</button>
                                            <button onClick={this.preparRegister} className="btn btn-danger">Sign up</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter (Login)
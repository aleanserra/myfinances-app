import React from 'react'

import {withRouter} from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import UserService from '../app/service/userService'
import {successMessage, errorMessage} from '../components/toastr'

class RegisterUsers extends React.Component{

    state={
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    }

    constructor(){
        super();
        this.service = new UserService();
    }

    save = () =>{

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        this.service.save(user)
            .then(response =>{
                successMessage('Success! Please log in.');
                this.props.history.push('/login');
            }).catch(error =>{
                errorMessage(error.response.data);
            })
    }

    cancel = () =>{
        this.props.history.push('/login');
    }

    render(){
        return (
            <Card title= "Register user">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label ="Name: *" htmlFor = "inputName">
                                <input type = "text" 
                                id="inputName" 
                                className="form-control"
                                name="name" 
                                onChange={e => this.setState({name: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label ="Email: *" htmlFor = "inputEmail">
                                <input type = "text" 
                                id="inputEmail" 
                                className="form-control"
                                name="email" 
                                onChange={e => this.setState({email: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label ="Password: *" htmlFor = "inputPassword">
                                <input type = "password" 
                                id="inputPassword" 
                                className="form-control"
                                name="password" 
                                onChange={e => this.setState({password: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label ="Confirm password: *" htmlFor = "inputConfirmPassword">
                                <input type = "password" 
                                id="inputConfirmPassword" 
                                className="form-control"
                                name="password" 
                                onChange={e => this.setState({confirmPassword: e.target.value})}/>
                            </FormGroup>
                            <button type="button" onClick={this.save} className="btn btn-success">Save</button>
                            <button onClick={this.cancel} type="button" className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter (RegisterUsers)
import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

class UserRegister extends React.Component{

    state={
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    }

    save = () =>{
        console.log(this.state);
    }

    render(){
        return (
            <div className='container'>
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
                                <button type="button" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default UserRegister
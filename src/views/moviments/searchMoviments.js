import React from 'react'
import {withRouter} from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import MovimentTable from './movimentTable'

import MovimentService from '../../app/service/movimentService'
import LocalStorageService from '../../app/service/localstorageService'

import * as messages from '../../components/toastr'
class SearchMoviments extends React.Component {
    
    state = {
        year: '',
        month: '',
        type: '',
        description: '',
        moviments: []

    }

    constructor(){
        super();
        this.service = new MovimentService();
    }

    search = () =>{

        if(!this.state.year){
            messages.errorMessage("Please enter with year");
            return false;
        }

        const userLogged = LocalStorageService.getItem('_user_logged');

        const movimentFilter ={
            year: this.state.year,
            month: this.state.month,
            type: this.state.type,
            description: this.state.description,
            user: userLogged.id
        }

        this.service
            .consult(movimentFilter)
            .then(response =>{
                this.setState({moviments: response.data})
            }).catch(error =>{
                console.log(error)
            })
    }

    edit = (id) =>{
        console.log('Edit moviment ', id)
    }
    
    delete = (id) =>{
        console.log('Delete moviment ', id)
    }

    render(){
        
        const months = this.service.getMonthList();
        const types = this.service.getTypeList();

        return(
            <Card title ="Search moviments">
                <div className = "row">
                    <div className = "col-md-6">
                        <div className = "bs-component">
                            <FormGroup htmlFor="inputYear" label = "Year: *">
                                <input type="text" 
                                        className="form-control" 
                                        id="inputYear" 
                                        value ={this.state.year}
                                        onChange={e => this.setState({year: e.target.value})}
                                        placeholder="Enter Year"/>          
                            </FormGroup>

                            <FormGroup htmlFor="inputMonth" label = "Month: *">
                                <SelectMenu id="inputMonth"
                                            value={this.state.month}
                                            className="form-control"
                                            onChange = {e => this.setState({month:e.target.value})}
                                            list = {months}/>
                            </FormGroup>

                            <FormGroup htmlFor="inputType" label = "Moviment type: *">
                                <SelectMenu id="inputType"
                                            className="form-control" 
                                            value={this.state.type}
                                            onChange = {e => this.setState({type:e.target.value})}
                                            list = {types} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDescription" label = "Description: ">
                                <input type="text" 
                                        className="form-control" 
                                        id="inputDescription" 
                                        value ={this.state.description}
                                        onChange={e => this.setState({description: e.target.value})}
                                        placeholder="Enter Description"/>          
                            </FormGroup>

                            <button onClick={this.search} type="button" className="btn btn-success"> Search </button>
                            <button type="button" className="btn btn-danger"> Register </button>

                        </div>
                    </div>
                </div>
                <br />
                <div className ="row">
                    <div className = "col-md-12">
                        <div className ="bs-component">
                            <MovimentTable moviments = {this.state.moviments} 
                                           deleteAction ={this.delete}
                                           editAction ={this.edit}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(SearchMoviments);
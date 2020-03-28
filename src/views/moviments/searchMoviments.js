import React from 'react'
import {withRouter} from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import MovimentTable from './movimentTable'

class SearchMoviments extends React.Component {
    
    state = {
        year: '',
        month: '',
        status: '',

    }

    search = () =>{
        console.log(this.state)
    }
    
    render(){
        const months = [
            {label: 'Select...', value: ''},
            {label: 'January', value: 1},
            {label: 'February', value: 2},
            {label: 'March', value: 3},
            {label: 'April', value: 4},
            {label: 'May', value: 5},
            {label: 'June', value: 6},
            {label: 'July', value: 7},
            {label: 'August', value: 8},
            {label: 'September', value: 9},
            {label: 'October', value: 10},
            {label: 'November', value: 11},
            {label: 'December', value: 12}
        ]

        const movimentType = [
            {label: 'Select...', value: ''},
            {label: 'Outgo', value: 'OUTGO'},
            {label: 'Income', value: 'INCOME'}
        ]

        const moviments = [
            {id:1, description: 'Salary', value: 5000, month: 1, type: 'Income', status: 'Ok'}
        ]

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
                                <SelectMenu className="form-control" 
                                            value={this.state.type}
                                            onChange = {e => this.setState({type:e.target.value})}
                                            list = {movimentType} />
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
                            <MovimentTable moviments = {moviments}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(SearchMoviments);
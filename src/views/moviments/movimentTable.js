import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.moviments.map ( moviment =>{
        return(
            <tr key={moviment.id}>
                <td>{moviment.description}</td>
                <td>{currencyFormatter.format(moviment.value,{locale: 'pt-PT'}) }</td>
                <td>{moviment.type}</td>
                <td>{moviment.month}</td>
                <td>{moviment.status}</td>
                <td>

                </td>
            </tr>
        )
    })

    return (
        <table className ="table table-rover">
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Value</th>
                    <th scope="col">Type</th>
                    <th scope="col">Month</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
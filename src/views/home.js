import React from 'react'

import UserService from '../app/service/userService'
import LocalStorageService from '../app/service/localstorageService'


class Home extends React.Component{

    state  = {
        balance: 0
    }

    constructor (){
        super();
        this.UserService = new UserService();

    }

    componentDidMount(){
        const userLogged = LocalStorageService.getItem('_user_logged');

        console.log(userLogged);

       this.UserService
            .getBalanceByUser(userLogged.id)
            .then(response =>{
                this.setState({balance: response.data})
            }).catch(error =>{
                console.error(error.response)
            })
    }

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.balance}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                    href="#/register-users" 
                    role="button"><i className="fa fa-users"></i>  Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg" 
                    href="https://bootswatch.com/flatly/#" 
                    role="button"><i className="fa fa-users"></i>  Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }

}

export default Home
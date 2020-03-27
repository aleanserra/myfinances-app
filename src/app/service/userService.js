import ApiService from '../apiservice'

class UserService extends ApiService{

    constructor(){
        super('/api/users');
    }

    authenticate(credentials){
        return this.post('/authenticate', credentials);
    }

    getBalanceByUser(id){
        return this.get(`/${id}/balance`);
    }

    save(user){
        return this.post('', user);
    }
}

export default UserService;
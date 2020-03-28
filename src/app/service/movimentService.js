import ApiService from '../apiservice'

export default class MovimentService extends ApiService{
    constructor(){
        super ('api/moviments')
    }

    consult(movimentFilter){
        
        let params = `?year=${movimentFilter.year}`

        if(movimentFilter.month){
            params = `${params}&month=${movimentFilter.month}`
        }

        if(movimentFilter.type){
            params = `${params}&type=${movimentFilter.type}`
        }

        if(movimentFilter.status){
            params = `${params}&status=${movimentFilter.status}`
        }

        return this.get(params);
    }
}
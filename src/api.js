import axios from 'axios'
import qs from 'querystring'

//let url = "http://localhost:3001" //http://chegi.xyz
let url = "http://chegi.xyz:8080"
export default {
    async get(route='/', data={}){
        let params = qs.stringify(data)
        if(params) params = '?' + params
        return this.apiResponse( await axios.get(url + route + params))
    },
    async post(route='/', data={}){
        return this.apiResponse( await axios.post(url+route,data))
    },
    apiResponse(res){
        let {status,data} = res
        console.log("status",status,'data',data);
        return data
    }
}
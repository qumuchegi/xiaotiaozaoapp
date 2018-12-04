import axios from 'axios'
import qs from 'querystring'

//let url = "http://localhost:3001" //本地开发是用这一句，对应服务器监听端口改为3001，同时注视掉下一句，
let url = "http://chegi.xyz:8080"//因为80已经被nginx占用,
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
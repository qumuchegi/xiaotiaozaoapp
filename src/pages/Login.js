import React, { Component } from 'react'
import {InputItem, Button,WhiteSpace,Toast} from 'antd-mobile'
import api from '../api'
import '../css/login.css'

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            name : '',
            password : ''
        }
    }
    toregister(){
        this.props.history.push('/register')
    }
    async login(){
        if(this.state.name && this.state.password){
            let res = await api.post('/login',{name:this.state.name,password:this.state.password})
            if(res.code === 0){//登录成功
                this.props.history.push(`/homepage/${this.state.name}?${this.state.password}`)
            }else if(res.code === 1){//登录失败,失败原因是还没有注册用户名
                Toast.fail(res.data)
            }
            else if(res.code === 2){//登录失败，原因是密码错误
                Toast.fail(res.data)
            }

        }
        else {
            Toast.fail('请填写完整！')

        }
    }
    render(){
        return (
            <div>
                <h1>SEU跳蚤APP</h1>
                <h3>登录</h3>
                <div id="input">
                    <InputItem onChange={v=>this.setState({name:v})}>
                        <span className="key2">用户名</span>
                    </InputItem>
                    <InputItem type="password" onChange={v=>this.setState({password:v})}>
                        <span className="key2">密码</span>
                    </InputItem>
                </div>
                <div id="buttonDiv">
                    <Button type="primary" onClick={()=>{this.login()}} size="small" className='button'>登录</Button>
                    <WhiteSpace size='lg'/>
                    <Button type="ghost" onClick={()=>this.toregister()} size="small" className='button'>注册</Button>
                </div>
            </div>
        )
    }
}
export default Login;
import React, { Component } from 'react';
import {InputItem, Button,WhiteSpace,Icon,Toast} from 'antd-mobile'
import api from '../api'
import '../css/register.css'

 export default class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            name : '',
            password : '',
            phone : '',
      

        }
    }
    componentDidMount(){
        console.log(api)
    }
    back(){
        this.props.history.goBack()
    }
    checkPassword(v){
        if(this.state.password!==v) 
            {
               Toast.fail('前后密码不一致！！') 

            }
    }
    async register(){
        console.log(this.state);
        let res = await api.post('/register',this.state)
        console.log('res',res)
        if(res.code === 0)
        Toast.success('注册成功，请返回登录！')
        else Toast.fail('注册失败，请稍后再试')
    }
    render(){
        return(
            <div>
                <Icon type="left" size="lg" onClick={()=>this.back()}>返回</Icon>
                <h3>填写注册信息</h3>
                <InputItem onChange={v=>this.setState({name:v})}>
                    <span className="key3">用户名</span> 
                </InputItem>
                <InputItem type="password" onChange={v=>this.setState({password: v})}>
                    <span className="key3">密码</span>
                </InputItem>
                <InputItem onBlur={v=>this.checkPassword(v)}>
                    <span className="key3">确认密码</span>
                </InputItem>
                <InputItem onChange={v=>this.setState({phone:v})}>
                    <span className="key3">手机</span>
                </InputItem>
                <WhiteSpace/>
                <Button type="primary" onClick={()=>this.register()} id='button'>注册</Button>
            </div>
        )
    }
}

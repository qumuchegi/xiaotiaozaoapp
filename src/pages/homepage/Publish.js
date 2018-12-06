import React, { Component } from 'react'
import {InputItem,SegmentedControl,WingBlank,Button,Toast} from 'antd-mobile'
import api from '../../api'
import '../../css/publish.css'

export default class Publish extends Component {
    constructor(props){
        super(props)
        this.state={
            selectedDiv: 'sell',
            //卖
             
            sellgood:'',
            sellprice:'',
            selldiscription:'',
            //买需求
           
            buygood:'',
            buyprice:'',
            buydiscription:'',
            myuser:{},
            //getMyhomepage:{}
        }
    }
    componentDidMount(){
        let myuser = this.props.myuser;
        //let getHotMyhomepage = this.props.getHotMyhomepage;
        //this.setState({getHotMyhomepage})
        console.log('pubmy',myuser);
        this.setState({myuser})
    }
    onSGChange(e){
        let selectedDiv = e.nativeEvent.selectedSegmentIndex===0 ? 'sell' : 'buy';
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
        this.setState({selectedDiv})
    }
    async pubSell(){
        if(this.state.sellgood && this.state.sellprice && this.state.selldiscription){
            let postObj = {
                owner:{name:this.state.myuser.name,phone:this.state.myuser.phone},//{name,phone} 卖方名字和手机
                name:this.state.sellgood, //货物名称
                price:this.state.sellprice, //价格
                discription:this.state.selldiscription, //介绍
            }
            console.log(postObj)
            let res = await api.post('/goodspub',postObj)
            if(res.code===0){
                Toast.success('发布成功')
                //window.setTimeout(window.location.reload(),1000)//手机端有问题
                //this.state.getHotMyhomepage()
            }else{
                Toast.info('发布失败')
            }
        }else{
            Toast.info('请填写完整！')
        }
    }
    async pubBuy(){
        if(this.state.buygood && this.state.buyprice && this.state.buydiscription){
            let postObj = {
                owner:{name:this.state.myuser.name,phone:this.state.myuser.phone},//{name,phone} 买方名字和手机
                name:this.state.buygood, //货物名称
                price:this.state.buyprice, //价格
                discription:this.state.buydiscription, //介绍
            }
            console.log(postObj)
            let res = await api.post('/needspub',postObj)
            if(res.code===0){
                Toast.info('发布成功！')
                //window.setTimeout(window.location.reload(),1000)
            }else{
                Toast.info('发布失败')
            }
        }else{
            Toast.info('请填写完整！')
        }

    }
    render(){
        return (
            <div>
                <WingBlank size="lg">
                    <SegmentedControl 
                    id="SegmentedControl"
                        values={['我要卖','我要买']} 
                        style={{color:'rgba(213,171,112)'}}
                        onChange={(e)=>this.onSGChange(e)}/> 
                </WingBlank>
                {
                    this.state.selectedDiv==='sell'?
                    <div className="inputbody">
                       <h3>填写出售信息</h3>
                       <InputItem type="text" onChange={v=>this.setState({sellgood:v})}>
                        <span className='key1'>出售宝贝名</span>
                       </InputItem>
                       <InputItem type="number" onChange={v=>this.setState({sellprice:v})}>
                        <span className='key1'>出手价格</span>
                       </InputItem>
                       <InputItem type="text" onChange={v=>this.setState({selldiscription:v})}>
                        <span className='key1'>宝贝描述</span>
                       </InputItem>
                       <Button type="ghost" size="small" onClick={()=>this.pubSell()} className='button'>发布</Button>
                    </div>
                    :
                    <div className="inputbody">
                       <h3>填写需求信息</h3>
                       <InputItem type="text" onChange={v=>this.setState({buygood:v})}>
                       <span className='key1'>需要宝贝名</span>
                       </InputItem>
                       <InputItem type="number" onChange={v=>this.setState({buyprice:v})}>
                       <span className='key1'>能接受价格</span>
                       </InputItem>
                       <InputItem type="text" onChange={v=>this.setState({buydiscription:v})}>
                       <span className='key1'>宝贝要求描述</span>
                       </InputItem>
                       <Button type="ghost" size="small" onClick={()=>this.pubBuy()} className='button'>发布</Button>
                    </div>
                }
            </div>
        )
    }

}
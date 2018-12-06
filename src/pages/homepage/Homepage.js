import React, { Component } from 'react'
import {TabBar} from 'antd-mobile'
import Publish from './Publish'
import Shouye from './Shouye'
import My from './My'
import api from '../../api'
import '../../css/homepage.css'
import {getTimeFrom_MongoDB_id} from './Shouye'

export default class Homepage extends Component {
    constructor(props){
        super(props)
        this.state={
            name : '',
            phone: '',
            password : '',
            selectedTab :'sy',
            mygood:[],
            myneed:[],
            selectedDiv : 'sell',
            newPubGoods_Num:0,
            newPubNeeds_Num:0
        }
        this.getHotMyhomepage=this.getHotMyhomepage.bind(this)
    }
    componentDidMount(){
        let user = this.props.match.params.user;
        let password = this.props.location.search.substr(1);
        this.setState({name:user,password})
        this.getMyhomepage(user,password);
    }
    isTimeNew(i){
        let time=getTimeFrom_MongoDB_id(i).split('-');
        let [y,m,d] = time
        let now = new Date();
        let Y = now.getFullYear();
        let M = now.getMonth();
        let D = now.getDate();
        let isnew =(
            Y > y ? ( M > m ? false : (12-m)>1 ? false : ( 31-d+(M-1)*31+D )>1 ? false : true)
            : M > m ? (31-d+(M -1)*31+D)>1 ? false : true
            : D-d >1 ? false : true
        )
        return isnew
    }
    async getMyhomepage(user,password){
        let res = await api.post('/login',{name:user,password});
        let my = res.data
        this.setState({mygood:my.good,myneed:my.need,myuser:my.user,phone:my.user.phone,name:user,password:password})
        this.computeNewNum(this.state.mygood,this.state.myneed)
      }
     computeNewNum(good,need){
        good.forEach(i=>{
            if(this.isTimeNew(i)){
                this.setState({newPubGoods_Num:this.state.newPubGoods_Num+1}) 
            }
        })
        need.forEach(i=>{
            if(this.isTimeNew(i)){
                this.setState({newPubNeeds_Num:this.state.newPubNeeds_Num+1}) 
            }
        })
     }
     async getHotMyhomepage(user,password){
        let res = await api.post('/login',{name:user,password});
        let my = res.data
        this.setState({mygood:my.good,myneed:my.need,myuser:my.user,phone:my.user.phone})
        this.setState({newPubGoods_Num:this.state.newPubGoods_Num+1}) 
      }
    onSGChange(e){
        let selectedDiv = e.nativeEvent.selectedSegmentIndex===0 ? 'sell' : 'buy';
         this.setState({selectedDiv})
    }
  
    render(){
        let TabBarItem = TabBar.Item
        return(
            <div>
                <h1>SEU跳蚤APP</h1>
               {
                   this.state.selectedTab==='sy'?
                       <Shouye goods={this.state.mygood} 
                                needs={this.state.myneed} 
                                selectedDiv={this.state.selectedDiv} 
                                onSGChange={(e)=>this.onSGChange(e)}//子组件 Shouye 用父组件的方法
                                isTimeNew={this.isTimeNew}
                        />
                        :
                    this.state.selectedTab==='fb'?
                        <Publish {...this.state} getHotMyhomepage={this.getHotMyhomepage}/>
                        :
                    <My name={this.state.name} 
                        phone={this.state.phone} 
                        mygood={this.state.mygood} 
                        myneed={this.state.myneed}
                        isTimeNew={this.isTimeNew}
                    />
               }
                
                <div id="tabbar" style={{position: 'fixed', bottom:0 ,width:'100%',zIndex:'23'}}>
                <TabBar tabBarPosition='bottom' >
                 <TabBarItem
                   title='首页'
                   key='首页'
                   icon={
                       <div
                       style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                       /> 
                   }
                   selectedIcon={
                    <div 
                    style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                    />}
                    selected={this.state.selectedTab === 'sy'}
                    badge={this.state.newPubGoods_Num+this.state.newPubNeeds_Num}
                    onPress={() => {
                     this.setState({
                         selectedTab: 'sy'
                    });
                    }}
                    data-seed="logId"
                  /> 
                 <TabBarItem
                    title='发布'
                    key='发布'
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                    selected={this.state.selectedTab ==='fb'}
s                   onPress={() => {
                    this.setState({
                        selectedTab: 'fb',
                        selectedDiv: 'sell'
                    });
                    }}
                    data-seed="logId"
                     /> 
                 <TabBarItem
                    title='我的'
                    key='我的'
                    icon={
                        <div style={{
                          width: '22px',
                          height: '22px',
                          background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                        />
                      }
                    selectedIcon={
                        <div style={{
                          width: '22px',
                          height: '22px',
                          background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                        />
                      }
                    selected={this.state.selectedTab==='wd'}
                    onPress={() => {
                    this.setState({
                        selectedTab: 'wd',
                        selectedDiv: 'sell'
                    });
                    }}
                    data-seed="logId"
                     /> 
                </TabBar>
                </div>
            </div>

        )
    }

}
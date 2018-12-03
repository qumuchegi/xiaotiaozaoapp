import React, { Component } from 'react'
import {TabBar} from 'antd-mobile'
import Publish from './Publish'
import Shouye from './Shouye'
import My from './My'
import api from '../../api'
import '../../css/homepage.css'
 
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
            selectedDiv : 'sell'
        }
    }
    componentDidMount(){
        let user = this.props.match.params.user;
        let password = this.props.location.search.substr(1);
        this.setState({name:user,password})
        console.log(user,password)
        this.getMyhomepage(user,password)
    }
    async getMyhomepage(user,password){
        let res = await api.post('/login',{name:user,password});
        console.log('res',res.data);
        let my = res.data
        this.setState({mygood:my.good,myneed:my.need,myuser:my.user,phone:my.user.phone})
        console.log('mygood',this.state.mygood)
    }
    /*
    async getHotMyhomepage(){
        const that = this
        let res = await api.post('/login',{name:that.state.name,password:that.state.password});
        console.log('hot',res.data);
        let my = res.data
        that.setState({mygood:my.good,myneed:my.need,myuser:my.user,phone:my.user.phone})
        console.log('mygood',that.state.mygood)
    }*/
    onSGChange(e){
        let selectedDiv = e.nativeEvent.selectedSegmentIndex===0 ? 'sell' : 'buy';
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
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
                                onSGChange={(e)=>this.onSGChange(e)}//子组建用父组件的方法
                        />
                        :
                    this.state.selectedTab==='fb'?
                        <Publish {...this.state} />
                        :
                    <My name={this.state.name} 
                        phone={this.state.phone} 
                        mygood={this.state.mygood} 
                        myneed={this.state.myneed}
                    />
               }
                
                <div id="tabbar" style={{position: 'fixed', bottom:0 ,width:'100%',zIndex:'23'}}>
                <TabBar tabBarPosition='bottom' barTintColor='rgba(213,171,112)' >
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
                    badge={1}
                    onPress={() => {
                        console.log('selectedIndex',this.state.selectedDiv)
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
                    badge={1}
                    onPress={() => {
                        console.log('selectedIndex',this.state.selectedDiv)
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
                    badge={1}
                    onPress={() => {
                        console.log('selectedIndex',this.state.selectedDiv)
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
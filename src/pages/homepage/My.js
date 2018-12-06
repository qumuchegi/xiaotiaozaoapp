import React, { Component } from 'react'
import { SegmentedControl,WingBlank,Card} from 'antd-mobile'
import {SellList,BuyList} from './Shouye'

export default class My extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            phone:'',
            myowngood:'',
            myownneed:'',
            selectedDiv:'sell',
        }
    }
    componentDidMount(){
        let {name,phone,mygood,myneed } = this.props;
        console.log(name,phone,mygood,myneed )
        let myowngood=mygood.filter(i=>i.owner.name===name)
        let myownneed=myneed.filter(i=>i.owner.name===name)
        this.setState(
            {
                name,phone,myowngood,myownneed 
            }
        )
    }
    onSGChange(e){
        let selectedDiv = e.nativeEvent.selectedSegmentIndex===0 ? 'sell' : 'buy';
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
        this.setState({selectedDiv})
    }
    render(){
        return(
            <div>
                <Card full>
                <Card.Header
                    title={this.state.name}
                    thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                    extra={<span>注销</span>}
                />
                <Card.Body>
                    <p>
                        <span className="key">手机</span>
                        <span className="value">{this.state.phone}</span>
                    </p>
                </Card.Body>
                </Card>
                <WingBlank>
                     <SegmentedControl 
                        id="SegmentedControl"
                        values={['我出手的','我需要的']} 
                        style={{color:'rgba(213,171,112)'}}
                        onChange={(e)=>this.onSGChange(e)}
                    /> 
                    </WingBlank>
                    
                    <div>
                        {
                            this.state.selectedDiv==='sell' ?
                               <SellList goods={this.state.myowngood} id='addbottom'/>
                            :
                               <BuyList needs={this.state.myownneed} id='addbottom'/>
                        }
                    </div>
                    <div style={{fontSize:'220%',textAlign:'center',paddingTop:'4%',color:'rgb(211, 162, 102)'}}>小跳蚤</div>

            </div>
        )
    }
}
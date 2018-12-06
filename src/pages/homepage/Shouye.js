import React from 'react'
import { SegmentedControl,WingBlank, Accordion, List} from 'antd-mobile'
import '../../css/shouye.css'

 const Shouye=({goods,needs,selectedDiv,onSGChange})=>(
            <div>
                <WingBlank size="lg">
                    <SegmentedControl 
                    id="SegmentedControl"
                    values={['找找宝贝','看看需求']} 
                    style={{color:'rgba(213,171,112)'}}
                    onChange={e=>onSGChange(e)}/> 
                </WingBlank>
                {
                     selectedDiv==='sell'?
                     <SellList goods={goods}/>
                    :
                     <BuyList needs={needs}/>
                }
                <div style={{fontSize:'220%',textAlign:'center',paddingTop:'4%',color:'rgb(211, 162, 102)'}}>小跳蚤</div>
            </div>
        
)
export default Shouye;
export const SellList=({goods})=>{
    
    return (
        goods ?
        goods.map((item,i)=>
        <div key={i}>
            <Accordion  className="my-accordion" >
                <Accordion.Panel header={<span className='title'>{item.name}</span>} key={i}>
                    <List className="my-list">
                    <List.Item>
                       <span className='key'>发布人</span> 
                       <span className='value'>{item.owner.name}</span>
                    </List.Item>
                    <List.Item>
                        <span className='key'>手机</span>
                        <span className='value'>{item.owner.phone}</span>
                     </List.Item>
                    <List.Item>
                        <span className='key'>价格</span>
                        <span className='value'>{item.price}</span>
                    </List.Item>
                    <List.Item>
                        <span className='key'>描述</span>
                        <span className='value'>{item.discription}</span>
                    </List.Item>
                    <List.Item>
                        <span className='key'>发布时间</span>
                        <span className='value'>{getTimeFrom_MongoDB_id(item)}</span>
                    </List.Item>
                    </List>
                </Accordion.Panel>
            </Accordion>
        </div>)
            : null
        
    )
}
     
export const BuyList=({needs})=>{
    return (
        needs ? 
        needs.map((item,i)=>
        <div key={i}>
        <Accordion   className="my-accordion" >
            <Accordion.Panel header={<span className='title'>{item.name}</span>} key={i}>
                <List className="my-list">
                <List.Item>
                   <span className='key'>发布人</span> 
                   <span className='value'>{item.owner.name}</span>
                </List.Item>
                <List.Item>
                    <span className='key'>手机</span>
                    <span className='value'>{item.owner.phone}</span>
                 </List.Item>
                <List.Item>
                    <span className='key'>价格</span>
                    <span className='value'>{item.price}</span>
                </List.Item>
                <List.Item>
                    <span className='key'>描述</span>
                    <span className='value'>{item.discription}</span>
                </List.Item>
                <List.Item>
                        <span className='key'>发布时间</span>
                        <span className='value'>{getTimeFrom_MongoDB_id(item)}</span>
                    </List.Item>
                </List>
            </Accordion.Panel>
        </Accordion>
    </div>
        )
        : null
    )
}

export const getTimeFrom_MongoDB_id=item=>{//从mongodb 的_id 得到时间戳
    var timestamp = item._id.toString().substring( 0, 8 );
    var date = new Date( parseInt( timestamp, 16 ) * 1000 );
    return   date.toJSON().substr(0,10)
}


/*
<div>发布人{item.owner.name}</div>
            <div>手机{item.owner.phone}</div>
            <div>物品{item.name}</div>
            <div>价格{item.price}</div>
            <div>描述{item.discription}</div>

//以下是假数据
var goods=
    [  
    {   owner:{name:'车格',phone:'12321'},//{name,phone} 卖方名字和手机
        name:'杯子', //货物名称
        price:'12元', //价格
        discription:'好杯子', //介绍
        deadline:'2019-1-1',//截止日
        //remarks:['hao',] //评论]
    }]

var needs=
    [{
        owner:{name:'车博',phone:'12321'},//{name,phone} 需求方名字和手机
        name:'杯子', //需求货物名称
        price:'12元', //接受价格
        discription:'好杯子', //需求货物要求
    }
    ]
*/
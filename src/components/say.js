import React from 'react'
import Submit_btn from './submit_btn'

import { Timeline, Button, Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader,TreeSelect,Alert ,notification} from 'antd';
import Nebulas from "nebulas"
import NebPay from "../dist/nebpay"



var nebPay = new NebPay();
var Neb = Nebulas.Neb ;
var neb = new Neb(new Nebulas.HttpRequest("https://testnet.nebulas.io"));
const InputGroup = Input.Group;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;
var countrys=new Array("俄罗斯","德国","巴西","葡萄牙","阿根廷","比利时","波兰","法国","西班牙","秘鲁","瑞士",
      "英格兰","哥伦比亚","墨西哥","乌拉圭","克罗地亚","丹麦","冰岛","哥斯达黎加","瑞典","突尼斯","埃及","塞内加尔",
    "伊朗","塞尔维亚","尼日利亚","澳大利亚","日本","摩洛哥","巴拿马","韩国","沙特阿拉伯");
const provinceData = ['亚洲区', '欧洲区','南美洲区','非洲区','中北美及加勒比海区'];
const cityData = {
    亚洲区: ['韩国', '日本', '沙特阿拉伯','伊朗','澳大利亚'],
    欧洲区: ['德国', '法国', '英格兰','比利时','西班牙','波兰','冰岛','塞尔维亚','葡萄牙','瑞士','克罗地亚','瑞典','丹麦'],
    非洲区: ['尼日利亚','埃及','塞内加尔','摩洛哥','突尼斯'],
    南美洲区: ['巴西', '阿根廷','乌拉圭','哥伦比亚','秘鲁'],
    中北美及加勒比海区: ['墨西哥','哥斯达黎加','巴拿马'],
};
var dappAddress = "n1gefqT1Vn7vGaCEDBA2UmV8dG2ChSNDRKW";
var Account = Nebulas.Account ;
var api = neb.api;
var as_arr = new Array();
var hasResult = false;
var k = 0;

export default class mySay extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            cities: cityData[provinceData[0]],
            secondCity: cityData[provinceData[0]][0],
            isResult: true,
            //hasResult: false,
            addInput:false,
            resultObj: {},
            reverse: false,
            //as_arr : new Array(), 
        }
      }
      

      sleep = (numberMillis)=> { 
        var now = new Date(); 
        var exitTime = now.getTime() + numberMillis; 
        while (true) { 
        now = new Date(); 
        if (now.getTime() > exitTime) 
        return; 
            } 
        }
      openNotificationWithIcon = (type, value) => {
        this.sleep(3000); 
        notification[type]({
          message: '提交成功',
          description: '' ,
        });
      }
      openNotificationWithIcon1 = (type, value) => {
        
        notification[type]({
          message: '不能为空',
          description: '' ,
        });
      }
      openNotificationWithIcon2 = (type) => {
        
        notification[type]({
          message: '请点击查看',
          description: '' ,
        });
      }
      openNotificationWithIcon3 = (type) => {
        
        notification[type]({
          message: '请输入正确的地址',
          description: '' ,
        });
      }
      cPB = ()=>{
        this.openNotificationWithIcon3('error');
      }
      saycontent(callback, nas_addr){
        
        for(let j = 0 ; j< 32 ; j++)
        {
            if(nas_addr == ""){
                console.log("请输入正确addr");
                this.openNotificationWithIcon1('error');
                return
            }
            var sy_cn = new Array();
            var from = nas_addr;
            var value = "0";
            var nonce = "0"
            var gas_price = "1000000"
            var gas_limit = "2000000"
            var callFunction = "get";
            var callArgs = "[\"" + countrys[j] + "\"]"; //in the form of ["args"]
            console.log("第"+ j+"个国家: " +  countrys[j]);
            var contract = {
                "function": callFunction,
                "args": callArgs
                }
            neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then((resp)=> {
                      console.log("数据查询完成\n")
                      if(resp["result"] !=="null"){
                        var sy_mp = JSON.parse(resp["result"]);
                        var sy_array = sy_mp["value"];
                        var l_addr = {};
                        for(let n = 0 ; n < sy_array.length ; n++ ){
                            //console.log("you it");
                            var l_addr = sy_array[n];
                            
                            //console.log("dizhi :"+l_addr[from]);
                            if( l_addr[from] != undefined )
                            {
                                //console.log( countrys[2] + ":" +l_addr[from] );
                                let sy_res = "";
                                sy_res = countrys[j] + "队 : " + l_addr[from];
                                sy_cn.push(sy_res);
                            
                            }
                            
                        }
                          
                          console.log(sy_cn);
                          //b++;
                          callback(null, sy_cn);
                          
                      }else {
                        console.log("----------");
                      }
                      

                  }).catch(function (err) {
                      console.log("er:" + err.message)
                      k++;
                      //this.setState({hasResult : true});
                      if(k % 32 == 0){
                        console.log(k);
                      //hasResult = true;
                    notification['error']({
                      message: '请输入正确的地址',
                      description: '' ,
                    });
                  }
                  })
                  b++;
                }
                
                
                callback("call", sy_cn);

      }
      handleClick = () => {
        this.setState({ reverse: !this.state.reverse });
      }
      handleProvinceChange = (value) => {
        this.setState({
          cities: cityData[value],
          secondCity: cityData[value][0],
        });
      }
      onSecondCityChange = (value) => {
        this.setState({
          secondCity: value,
        });
      }
      cbPush = (resp) => {
        var resp_JSON = JSON.stringify(resp)
        this.openNotificationWithIcon('success',resp_JSON);
        sub_Input.value = ""
      }
      cPoll = ()=>{
          console.log("jindao cuowu yejian ")
        this.openNotificationWithIcon1('error',"resp_JSON");
      }
      cPP = ()=>{
        this.openNotificationWithIcon2('success');
      }
      
     

  render() {
    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
    return (
        <div>
            <div style={{width:"3%" , float: "left"}}>.</div>
            <div style={{width:"50% ",float: "left" }}>
            <div style={{ margin: '22px 0' }} />
            <h1> 
            <font color="black">球队留言</font></h1>
            <div style={{ margin: '20px 0' }} />
        <Select defaultValue={provinceData[0]} style={{ width: '24%' }} onChange={this.handleProvinceChange}>
          {provinceOptions}
        </Select>
        <div style={{ margin: '10px 0' }} />
        <Select value={this.state.secondCity} style={{ width: '16%' }} onChange={this.onSecondCityChange}>
          {cityOptions}
        </Select>
        <h>  国家男子足球队</h>
        <div style={{ margin: '20px 0' }} />
        <TextArea id='sub_Input' rows={5} placeholder="Write now!" style={{ width: '80%' }} />
        <Submit_btn 
        submitFunc={()=>{
            var value = "0";
            var callFunction = "save"
            var callArgs = "[\"" + this.state.secondCity + "\",\"" + sub_Input.value + "\"]"
            console.log("shuchuwokankan:"+sub_Input.value)
            if( sub_Input.value == ""){
                console.log("返回不能为空");
                this.cPoll();
                return 
            }
            nebPay.call(dappAddress, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
                listener: this.cbPush        //设置listener, 处理交易返回信息
                });
        
            }}/>
            </div>
            <div style={{width:"45% ",float: "left" }}>
    <div style={{ margin: '30px 0' }} />
    <h1> 留言查询</h1>
    <div style={{ margin: '20px 0' }} />
    <Search
        id='search_Input'
        placeholder="n1LQD7w8Ffjrq7pQLRTNVEbyHn7kUF1Bd6J"
        enterButton="Search"
        size="large"
        style={{ width: '80%' }}
        onSearch={(value)=>{
            this.saycontent(function(ae, new_data) {
                if (ae == "call") {
                    notification['success']({
                        message: '请点击查看',
                        description: '' ,
                      });
                   
                }
                as_arr = new_data ;
                console.log(b);
                if ( false ) {
                    notification['success']({
                        message: '请点击查看',
                        description: '' ,
                      });
                }
            },value)}}
        />
        <div style={{ margin: '25px 0' }} />
        {
            this.state.isResult ?
            <Content_result  named = {as_arr} />
            :
            <div />
        }
</div>

        </div>
        
       
    );
  }
}

class Content_result extends React.Component{
    constructor(props){
      super(props)
      this.state={
          reverse: false,
      }
    }
    handleClick = () => {
      this.setState({ reverse: !this.state.reverse });
    }
    static defaultProps={
      submitFunc:()=> {}
    }
    render(){
      return(
          <div>
          <Timeline pending="记录中..." reverse={this.state.reverse}>
          <Timeline.Item>世 界 杯</Timeline.Item>
          {
              as_arr.map(function(named){
                  return (
                      <Timeline.Item>{named}</Timeline.Item>
                  )
              })
          }
          </Timeline>
          <Button type="primary" style={{ marginTop: 16 }} onClick={this.handleClick}>查 看</Button>
        </div>
      )
    }
  }
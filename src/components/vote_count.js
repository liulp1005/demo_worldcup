import React from 'react'
import Nebulas from 'nebulas'

var Neb = Nebulas.Neb ;
var neb = new Neb(new Nebulas.HttpRequest("https://testnet.nebulas.io"));
        //console.log("加载的时候输出neb："+ neb);
var dappAddress = "n1syF6o8qs5tY9HxssU21ufz6Thyo1MAEih";
var Account = Nebulas.Account ;
var api = neb.api;
var countrys=new Array("俄罗斯","德国","巴西","葡萄牙","阿根廷","比利时","波兰","法国","西班牙","秘鲁","瑞士",
        "英格兰","哥伦比亚","墨西哥","乌拉圭","克罗地亚","丹麦","冰岛","哥斯达黎加","瑞典","突尼斯","埃及","塞内加尔",
        "伊朗","塞尔维亚","尼日利亚","澳大利亚","日本","摩洛哥","巴拿马","韩国","沙特阿拉伯");
var vote_Map = {
    "俄罗斯":"0","德国":"0","巴西":"0",
    "葡萄牙":"0","阿根廷":"0","比利时":"0",
    "波兰":"0","法国":"0","西班牙":"0","秘鲁":"0","瑞士":"0",
    "英格兰":"0","哥伦比亚":"0","墨西哥":"0",
    "乌拉圭":"0","克罗地亚":"0","丹麦":"0","冰岛":"0","哥斯达黎加":"0","瑞典":"0","突尼斯":"0","埃及":"0","塞内加尔":"0",
    "伊朗":"0","塞尔维亚":"0","尼日利亚":"0","澳大利亚":"0","日本":"0","摩洛哥":"0","巴拿马":"0","韩国":"0","沙特阿拉伯":"0"
};
var vote_Map1 = {};
var resultGot = 0;



export default class Vote_count extends  React.Component{
    constructor(props){
      super(props)
    }
    static defaultProps={
        keyInfo : "null",
        
      }
    

    convert_data(new_Map){
        var new_data = new Array(); 
        for(let m = 0; m < 32; m++ ){
            new_data.push(new_Map[countrys[m]])
        }
        return new_data ;
    }


    count(callback){

        for(let i  =0 ; i < 32 ; i++){
            console.log("第"+ i+ "次调用call")
            var from = Account.NewAccount().getAddressString();
            var value = "0";
            var nonce = "0"
            var gas_price = "1000000"
            var gas_limit = "2000000"
            var callFunction = "get";
            var callArgs = "[\"" + countrys[i] + "\"]"; //in the form of ["args"]
            var contract = {
                "function": callFunction,
                "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then((resp)=> {
        if(resp["result"] !=="null"){
            var respData = JSON.parse(resp["result"])  
            var key_Map = respData.key;
            vote_Map[key_Map] = parseInt(respData.value);
          
        }else {
            vote_Map[countrys[i]]= 0;
        }
        

        resultGot++;
        var z = resultGot % 32
        if (true) {
            var vote_data = this.convert_data(vote_Map);
            callback(null, vote_data);
        }

    }).catch(function (err) {

        console.log("error:", err)
    })
}

    }
    
  }
  
  

    
        
        


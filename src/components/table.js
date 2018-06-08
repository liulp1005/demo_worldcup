import React from 'react'
import {Table, Icon , Divider, notification} from 'antd'
import Neb_test from './../neb_test'
import Nebulas from "nebulas"
import NebPay from "../dist/nebpay"

var nebPay = new NebPay();

var Neb = Nebulas.Neb ;
var neb = new Neb(new Nebulas.HttpRequest("https://testnet.nebulas.io"));
// //neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
console.log("加载的时候输出neb："+ neb);
// console.log("加载的时候输出neb："+ neb.HttpRequest.Account);
// //console.log("\n\n");
var dappAddress = "n1syF6o8qs5tY9HxssU21ufz6Thyo1MAEih";
var Account = Nebulas.Account ;
var api = neb.api;

console.log("加载的时候输出api:" + api);

const sleep = (numberMillis)=> { 
    var now = new Date(); 
    var exitTime = now.getTime() + numberMillis; 
    while (true) { 
    now = new Date(); 
    if (now.getTime() > exitTime) 
    return; 
    } 
}
//n1r2bYnsMe8APf6HKX7fYmgqdaWSN2RB2LM
//import Nebulas from "nebulas";

export default class myTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tDate: [],
            selectedRowKeys: []
        }
    }
    
      openNotificationWithIcon = (type, value) => {
        this.sleep(3000); 
        notification[type]({
          message: '提交成功',
          description: '' ,
        });
      }
    cbPush(resp){
        console.log("response of push" + JSON.stringify(resp));
        var resp_JSON = JSON.stringify(resp);
        sleep(3000); 
        notification['success']({
          message: '提交成功',
          description: '' ,
        });
      }
    componentDidMount() {
        const data = []

        var countrys=new Array("俄罗斯","德国","巴西","葡萄牙","阿根廷","比利时","波兰","法国","西班牙","秘鲁","瑞士",
      "英格兰","哥伦比亚","墨西哥","乌拉圭","克罗地亚","丹麦","冰岛","哥斯达黎加","瑞典","突尼斯","埃及","塞内加尔",
    "伊朗","塞尔维亚","尼日利亚","澳大利亚","日本","摩洛哥","巴拿马","韩国","沙特阿拉伯");
        var rank = new Array("65","1","2","3","4","5","6","7","8","10","11",
      "12","13","16","17","18","19","21","22","25","28","30","32",
    "34","38","41","43","44","48","49","62","63");
    var content_countrys = new Array(
        "人们不关心俄罗斯队能打进几个球，人们只关心俄罗斯球迷能打几个英国足球流氓！","他们的球星是和郭德纲齐名的巨星，他们的教练是和贝尔格里尔斯齐名的美食家",
        "1：7的伤痛让他们迫不及待的期盼着世界杯开幕，别忘了，太心急容易受伤啊","他们在本届世界杯的任务，是捍卫被其他洲际冠军挥霍的差不多的洲际冠军尊严！",
        "他们想要赢球，需要梅西的正常发挥；他们想要夺冠，需要伊瓜因的不正常发挥","他们给很多伪球迷带来了很多困扰“卢卡库居然是比利时人？”“阿扎尔居然是比利时人？“”库尔图瓦居然是比利时人？",
        "来不及解释了，老斯基们，快上车","失去本泽马后，法国队面临着两个难题：1：如何赢球，2：万一赢不了找谁背锅",
        "本来他们想报上届世界杯上智利和荷兰的一箭之仇的，但是荷兰和智利不给面子，没来！","他们能够参加世界杯，主要是他们的萨满的功劳。正所谓一命二运三风水，四厂五仁六我魔",
        "小组只输了一场，积分那么高，差点进不了世界杯，还差点进了另类记录集锦——比如最高分被淘汰的队伍","如果世界杯上没有英格兰，段子手会少掉多少快乐",
        "足球迷和篮球迷们，争论不休的一个话题：JAMES应该怎么读？","很多人对他们的认知来源于两种食物：鸡肉卷和小豌豆",
        "俗话说得好“君子动口不动手”，但是对于他们来说：“君子动手不动口”会更合适。(苏牙)","他们通过一群奇，淘汰了一群斯，然后闯进了世界杯",
        "和中国勇夺世界杯一样，他们勇夺欧洲杯顶替的是同一个国家","他们终于不用受到这种指责了——33万人里找不出11个会踢足球的",
        "我们不产生球星，我们只产生球星的爸爸","瑞典队能进入世界杯时无神论者们的伟大胜利，因为他们没有依靠他们的“上帝”",
        "如果你是伪球迷千万不要假装对他们很了解，因为真球迷对他们的了解程度也只是刚到，能把他们不认做土耳其","他们的前锋是英格兰门将的噩梦，他们的门将是意大利门将的噩梦。",
        "他们改变了历史，因为他们在2002年的出色发挥。自从那以后，中国队想要进入世界杯，不能再寄希望于本届夺冠了","他们不光有伊朗梅西，他们甚至还有伊朗没戏",
        "多亏了他们，中国队才夺得了2006年世界杯的冠军","击败他们的方式很简单，只要告诉他们，赢球奖金已经被官员们提前瓜分了就行",
        "每一个有女朋友的球迷，都面临着三个难以解答的足球难题。1：什么叫越位，2：马德里竞技和皇家马德里是同一支球队吗？3：澳大利亚为什么在亚洲区？","无论他们在本届世界杯成绩如何，他们的联赛也足够他们获得一项荣誉：戒赌吧终身贡献奖",
        "他们把名字中的一个字换一下就可以直接去参加法甲了，反正人都是那些人","他们打进世界杯后，他们的解说员在播音室嘶吼。多希望那个人时贺炜，刘嘉远，刘建宏或者黄健翔啊",
        "他会带球，他会进球，他还会吃掉你的拉布拉多，他们还会输给中国队！","他们离世界杯夺冠只差一步——让国际足联在世界杯上加入允许转会规则！",
    );
/*    var Btn=render:function(){
          <button onClick={savefunction('thisStatus')}> 保存 </button>
       };*/

        var couimage = null;
        for (let i = 0; i < 32; i++) {
            data.push({
                key: i,
                //countryimage: 2,
                name: countrys[i],
                age: rank[i],
                address: content_countrys[i],
                //remark: 'http://www.cnblogs.com/luozhihao/',
                operate: <Neb_test
                addFunc={()=>{
                    console.log("进来点支持");
                    console.log("调用save方法");
                    var value = "0";
                    var callFunction = "save"
                    //var callArgs = "[\"" + this.refs.inputRef.value + "\",\"" + this.refs.inputValueRef2.value + "\"]"
                    var callArgs = "[\"" + countrys[i] + "\",\"" + "2" + "\"]"
                    console.log(callArgs)
                    nebPay.call(dappAddress, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
                        listener: this.cbPush        //设置listener, 处理交易返回信息
                  });
                    //alert("请通过nas钱包投票给"+ countrys[i] +"队") ;

                    }} />
                

            })
        }

        this.setState({tDate: data})
    }

    // checkbox状态
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }
    render() {
        const columns = [
          {
            title: '国家队名称',
            width: '15%',
            dataIndex: 'name'
        }, {
            title: '世界排名',
            width: '10%',
            dataIndex: 'age',
        }, {
            title: '球队吐槽',
            width: '50%',
            dataIndex: 'address'
        },
        {
            title: '点赞',
            width: '10%',
            dataIndex: 'operate',
        }]

        const { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        const pagination = {
            total: this.state.tDate.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        }

        return (
          <div>
              <div style={{width:"8% ",float:"left" }}>.    </div>
          <div style={{width:"90% ",float:"none" }}>
            <Table columns={columns} dataSource={this.state.tDate} pagination={pagination} />
            </div>
            
            </div>


        )
    }
}

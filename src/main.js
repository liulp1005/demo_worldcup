/**
 *
 * @authors luozh@snail.com
 * @date    2016-03-21 16:42:35
 * @description 主入口模块
 */

import React from 'react'
import { render } from 'react-dom'

// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router'

// 引入Antd的导航组件
import { Menu, Icon, Switch, Button } from 'antd'
const SubMenu = Menu.SubMenu

// 引入Ant-Design样式 & Animate.CSS样式
import 'animate.css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'
import Neb_test from './neb_test'
// 引入主体样式文件
import './main.css'
import NebPay from "./dist/nebpay"
import Support_button from './components/support_button'
// 引入单个页面（包括嵌套的子页面）
import myTable from './components/table.js'
import myForm from './components/form.js'
import myChart from './components/chart.js'
import myAnimate from './components/animate.js'
import myCalendar from './components/calendar.js'
import myCard from './components/fetch.js'
import mySay from './components/say.js'

const ACTIVE = { color: 'red' }
var nebPay = new NebPay();
var to_liulp_addr = "n1LQD7w8Ffjrq7pQLRTNVEbyHn7kUF1Bd6J";
// 配置导航
class Sider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '',
            username: 'liulppppp'
        }
    }
    static defaultProps={
        doSomething:()=>{
            
        }
      }

    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    }

    componentDidMount() {
        this.getUser()
    }
    cbPush(resp){
        console.log("response of push" + JSON.stringify(resp));
      }

    

    getUser = () => {
        this.setState({
            username: 'auth: by liulp'
        })
    }

    render() {
        return (
            <div>
                <div id="leftMenu">
                    <img src='src/assets/images/logocup.png' width="50" id="logo"/>
                    <Menu theme="dark"
                        onClick={this.handleClick}
                        style={{ width: 185 }}
                        defaultOpenKeys={['sub1', 'sub2']}
                        defaultSelectedKeys={[this.state.current]}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>世界杯社区</span></span>}>
                            <Menu.Item key="1"><Link to="/myTable">点赞你的球队</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/myChart">球队热度排名</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/mySay">球队留言版</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>世界杯新闻</span></span>}>
                            <Menu.Item key="5"><Link to="/myCard">资讯</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/myAnimate">关于我</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div id="rightWrap">
                    <Menu mode="horizontal">
                        <SubMenu title={<span><Icon type="user" />{ this.state.username }</span>}>
                            <Menu.Item key="setting:1" >
                            <Support_button 
                            support_Func={()=>{
                                var value = "1";
                                console.log("进入到打赏函数")
                                nebPay.pay(to_liulp_addr , value , {    
                                    listener: this.cbPush        //设置listener, 处理交易返回信息
                                });
                                alert("请通过nas钱包打赏一下liulp吧") ;
                            }} />
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="right-box">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}


// 配置路由
render((
    <Router history={hashHistory} >
        <Route path="/" component={Sider}>
            <IndexRoute path="myCard" component={myCard} />
            <Route path="myTable" component={myTable} />
            <Route path="myForm" component={myForm} />
            <Route path="myCalendar" component={myCalendar} />
            <Route path="myChart" component={myChart} />
            <Route path="mySay" component={mySay} />
            <Route path="myAnimate" component={myAnimate} />
            <Route path="myCard" component={myCard} />
        </Route>
    </Router>
), document.getElementById('app'));

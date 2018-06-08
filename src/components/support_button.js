import React, {Component} from 'react'

//n1r2bYnsMe8APf6HKX7fYmgqdaWSN2RB2LM
//import Nebulas from "nebulas";

export default class Support_button extends Component{
  constructor(props){
    super(props)
  }
  static defaultProps={
    keyInfo : "null",
    support_Func:()=> {}
  }
  render(){
    return(
      <div style={{marginTop: 0,display: "flex"}}>
        <a href="javascript:void(0)"
        onClick={this.props.support_Func}
        style={{margin: 0,fontSize: 10}} > 打个赏吧</a>
      </div>
    )
  }
}



import React, { Component } from 'react';
import {Button, Icon} from 'antd'

class Neb_test extends Component{
  constructor(props){
    super(props)
  }
  static defaultProps={
    keyInfo : "null",
    addFunc:()=> {}
  }
  render(){
    return(
      <div style={{marginTop: 10,display: "flex"}}>
        <a href="javascript:void(0)" 
        onClick={this.props.addFunc}
        style={{margin: 0,fontSize: 10}}>支持一下</a>
      </div>
    )
  }
}

export default Neb_test

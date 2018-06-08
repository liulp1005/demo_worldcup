import React, { Component } from 'react';
import {Button, Icon} from 'antd'

export default class Submit_btn extends Component{
  constructor(props){
    super(props)
  }
  static defaultProps={
    submitFunc:()=> {}
  }
  render(){
    return(
      <div style={{marginTop: 10,display: "flex"}}>
        <Button size="large" type="primary"
        onClick={this.props.submitFunc}
        style={{margin: 0,fontSize: 10}}>留 言</Button>
      </div>
    )
  }
}
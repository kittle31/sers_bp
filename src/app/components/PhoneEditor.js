import React from 'react'
import {NumericInput} from "@blueprintjs/core"

export default class PhoneEditor extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      areaCode: 360,
      prefix: 0,
      suffix: 0
    }
  }

  componentWillReceiveProps(newProps){
    let value
    if (newProps.state && newProps.field)
       value = newProps.state[newProps.field]
    if (!value){
      this.setState({
        areaCode : 360,
        prefix: 0,
        suffix: 0
      })
    }
    else
      this.setState({
      areaCode: value.areaCode || 360,
      prefix: value.prefix || 0,
      suffix: value.suffix || 0
    })
  }

  handleValueChanged(field, maxLen, number, string){
    let str = string
    if (string.length >= maxLen)
      str = string.substr(0,maxLen)
    this.setState( {[field] : str })

    this.state[field] = str
    this.props.state[this.props.field] = this.state
  }

  render(){
    const {label} = this.props
    return (
      <div style={{padding: 5, display: 'flex', flexDirection: 'column'}}>
        <label style={{paddingLeft: 5}}>{label}</label>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 20}}>
          <div>(</div>
          <NumericInput style={{width: 50}} value={this.state.areaCode} placeholder={"Area"}
                buttonPosition={"none"}
                selectAllOnFocus={true}
                onValueChange={this.handleValueChanged.bind(this, 'areaCode', 3)}
                />
          <div>) - &nbsp;</div>
          <NumericInput style={{width: 60}} value={this.state.prefix} placeholder={"prefix"}
                buttonPosition={"none"}
                selectAllOnFocus={true}
                onValueChange={this.handleValueChanged.bind(this, 'prefix', 3)}
                />
          <div>-</div>
          <NumericInput style={{width: 80}} value={this.state.suffix} placeholder={"number"}
                buttonPosition={"none"}
                selectAllOnFocus={true}
                onValueChange={this.handleValueChanged.bind(this, 'suffix', 4)}
                />
        </div>
      </div>
    )
  }
}
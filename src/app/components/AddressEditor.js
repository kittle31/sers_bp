import React from 'react'

import { makeTextInput } from '../util/UIUtil'

export default class AddressEditor extends React.Component {
  constructor(){
    super()
      this.state = {
        addressLine1: '',
        city: '',
        st: 'WA',
        zipCode: ''
        }
  }

  componentWillReceiveProps(newProps){
    let value
    if (newProps.state && newProps.field)
       value = newProps.state[newProps.field]
    this.setState({
      addressLine1: value.addressLine1 || '',
      city: value.city || '',
      st: value.st || 'WA',
      zipCode: value.zipCode || ''
    })
  }

  handleValueChanged(field, event){
    this.setState({ [field] : event.target.value })
    this.state[field] = event.target.value
    this.props.self.setState({ [this.props.field] : this.state})
  }

  render(){
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {makeTextInput(this, this.state,"addressLine1", "Address" , 350)}
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {makeTextInput(this, this.state, "city", "City", 200 )}
          {makeTextInput(this, this.state, "st", "State",50 )}
          {makeTextInput(this, this.state, "zipCode", "Zip", 100 )}
        </div>
      </div>
    )
  }
}

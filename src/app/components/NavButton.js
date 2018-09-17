import React from 'react';
import { Redirect } from 'react-router-dom'
import {Button} from '@blueprintjs/core'

export class NavButton extends React.Component{
  constructor(){
    super()
    this.state = {
      clicked: false
     }
    }

   handleClick(event){
     this.setState({clicked: true})
   }

   render() {
    const {text} = this.props

    if (this.state.clicked && this.props.url) {
      return (<Redirect to={{ pathname: this.props.url }} />);
    }

    return (<Button text={text}
                    onClick={this.handleClick.bind(this)}
                    style={{marginRight: 15, backgroundColor: '#FFB366'}}/>);
    }
  }


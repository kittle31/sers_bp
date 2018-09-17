import React from 'react'

export class SpacerUp extends React.Component{
    render(){
        return <div style={{height: this.props.size}}/>
    }
}

export class SpacerSide extends React.Component{
    render(){
        return <div style={{width: this.props.size}}/>
    }
}
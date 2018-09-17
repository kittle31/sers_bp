import React from 'react';
import { Redirect } from 'react-router-dom'

import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import {Button, Navbar, NavbarHeading, NavbarDivider, NavbarGroup} from '@blueprintjs/core'
import {Classes} from '@blueprintjs/core'

import {getGlobalStore} from "../state/globalStore"
import * as types from "../state/actionTypes"
import {colors} from "../util/constants"
import {NavButton} from './NavButton'


export class SersNavbar extends React.Component{
    constructor(){
      super()
      this.state={
        goHome: false
        }
    }
    handleLogout(){
      getGlobalStore().dispatch( {type: types.USER_LOGOUT})
      }

    goHome(event){
      this.setState({goHome: true})
    }

    getMenu(menuItems){
       if ( !menuItems ) {
         return null;
       }
       const buttons = menuItems.map( (item, i) => {
        return (<NavButton {...item} key={i}/>)
        })
       return (<div style={{display: 'flex', flexDirection: 'row'}}>
         {buttons}
       </div>);
    }

   render(){
    const {title, menuItems} = this.props

    if ( !this.props.user.auth ) {
      return (<Redirect to={{ pathname: '/login', from: '/' }} />)
    }

    if ( this.state.goHome ) {
      return (<Redirect to={{ pathname: '/'}} />)
    }

     return (
     <div>
       <Navbar className="bp3-navbar" fixedToTop={true} style={{backgroundColor: colors.brown1}}>
         <NavbarGroup align={"left"}>
           <NavbarHeading>SERS</NavbarHeading>
           <NavbarHeading>{title}</NavbarHeading>
         </NavbarGroup>
         <NavbarGroup>
           <NavbarDivider/>
           <Button className={Classes.MINIMAL} style={{paddingTop: 8}} icon="home" text="Home" onClick={this.goHome.bind(this)}/>
         </NavbarGroup>
         <NavbarGroup align={"right"}>
           <div>{this.props.user.userName}</div>
           <NavbarDivider/>
           <Button onClick={this.handleLogout} >Logout</Button>
         </NavbarGroup>
       </Navbar>
       {this.getMenu(menuItems)}
     </div>
     )
   }
  }

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps, null)(SersNavbar)


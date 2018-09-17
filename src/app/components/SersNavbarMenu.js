import React from 'react';
import { Redirect } from 'react-router-dom'

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import {
  Button, Navbar, NavbarHeading, NavbarDivider, NavbarGroup, Menu,
  Popover, PopoverInteractionKind, Position
} from '@blueprintjs/core'
import { Classes } from '@blueprintjs/core'

import { getGlobalStore } from "../state/globalStore"
import * as types from "../state/actionTypes"
import { colors } from "../util/constants"

export class SersNavMenu extends React.Component {
  constructor() {
    super()
    this.state = {
      goHome: false,
    }
  }
  handleLogout() {
    getGlobalStore().dispatch({ type: types.USER_LOGOUT })
  }

  handleClick(menuitem){
    getGlobalStore().dispatch({type: types.MENU_SELECTED, payload: menuitem} )
  }

  goHome(event) {
    getGlobalStore().dispatch({type: types.MENU_HOME})
  }

  getSubmenu(subItems, buttonIdx) {
    const menuItems = subItems.map((menuItem, menuIdx) => {
      if (menuItem.items) {
        const subMenu = this.getSubmenu(menuItem.items, buttonIdx + " " + menuIdx)
        return (
          <Menu.Item key={buttonIdx + " " + menuIdx} text={menuItem.text}                     
                     style={{ backgroundColor: this.props.buttonColor}}
                     onClick={this.handleClick.bind(this, menuItem)}>
            {subMenu}
          </Menu.Item>)
      }
      else
        return (<Menu.Item key={buttonIdx + " " + menuIdx} text={menuItem.text} active={false}
                           style={{ backgroundColor: this.props.buttonColor}}
                           onClick={this.handleClick.bind(this, menuItem)} />)
    })
    return menuItems
  }

  getMenu() {
    const buttons = this.props.mainMenu.items.map((item, buttonIdx) => {
      const button = <Button text={item.text} url={item.url} key={buttonIdx} onClick={this.handleClick.bind(this, item)} style={{ backgroundColor: this.props.buttonColor}}/>
      if (item.items) {
        const menuItems = this.getSubmenu(item.items, buttonIdx)
        const menu = (<Menu style={{ backgroundColor: this.props.buttonColor}}>
          <Menu.Item disabled={true} />
          {menuItems}
        </Menu>)
        return (<Popover key={buttonIdx} interactionKind={PopoverInteractionKind.HOVER}
          minimal={true}
          hoverCloseDelay={0}
          hoverOpenDelay={0}
          position={Position.BOTTOM_LEFT}>
          {button}
          {menu}
        </Popover>)
      }
      else
        return button
    })
    return buttons
  }

  getBreadcrums(selected, menu) {
    // return a list of menu items
    for (var idx=0; idx < menu.items.length; idx++){
      const mi = menu.items[idx]
      if (mi == selected)
        return [mi]
      if (mi.items) {
         const result = this.getBreadcrums(selected, mi)
         if (result.length > 0)
           return [mi].concat(result)
      }
    }
  return []
  }

getBreadCrumList(){
  let crumbs =this.getBreadcrums(this.props.menu, this.props.mainMenu)
  crumbs.unshift(this.props.mainMenu)
  const list =  crumbs.map(
    (item, i) => {
       if (item == this.props.menu)
         return ( <li key={i} className="bp3-breadcrumb bp3-breadcrumb-current">{item.text}</li>)
       else
         return ( <li key={i}><a className="bp3-breadcrumb">{item.text}</a></li>)
    })

  return (
    <ul className="bp3-breadcrumbs">
      {list}
    </ul>)
  }

  render() {
    if (!this.props.auth) {
      return (<Redirect to={{ pathname: '/login', from: '/' }} />)
    }

    if (this.state.goHome) {
      return (<Redirect to={{ pathname: '/' }} />)
    }

    if (this.props.menu){
        if (this.props.menu.url){
          const parts = window.location.href.split('#')
          const path = parts[parts.length-1]
          if (path != this.props.menu.url)
            return (<Redirect to={{ pathname: this.props.menu.url }} />)
        }
    }

    return (
      <div>
        <Navbar className="bp3-navbar" fixedToTop={true} style={{ backgroundColor: this.props.menuColor }}>
          <NavbarGroup align={"left"}>
            <NavbarHeading>SERS</NavbarHeading>
            <NavbarHeading style={{width: 150}}>{this.props.menu.text}</NavbarHeading>
          </NavbarGroup>
          <NavbarGroup>
            <NavbarDivider />
            <Button className={Classes.MINIMAL} style={{ paddingTop: 8 }} icon="home" text="Home" onClick={this.goHome.bind(this)} />
          </NavbarGroup>
          <NavbarGroup>
            {this.getMenu()}
          </NavbarGroup>
          <NavbarGroup align={"right"}>
            <div>{this.props.user.firstName}</div>
            <NavbarDivider />
            <Button onClick={this.handleLogout} >Logout</Button>
          </NavbarGroup>
        </Navbar>
        {this.getBreadCrumList()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
    auth: state.login.auth,
    menu: state.homepage.selectedMenu,
    mainMenu: state.homepage.menu,
    menuColor: state.homepage.menuColor,
    buttonColor: state.homepage.buttonColor
  }
}

export default connect(mapStateToProps, null)(SersNavMenu)


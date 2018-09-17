import React from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import SersNavbarMenu from './SersNavbarMenu'
import { getGlobalStore } from '../state/globalStore'
import * as types from "../state/actionTypes"
import {colors} from "../util/constants"
import{makePicker} from "../util/util"

class HomePage extends React.Component {
    constructor(){
      super()
      this.state = {
        navBarColor: colors.brownLight1,
        navButtonColor: colors.brownLight3
      }
    }
    componentDidMount(){
      getGlobalStore().dispatch( {type: types.MENU_HOME} )
    }

    renderColorPicker() {
      return (
        < div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{width: 150}}>
          <p>Nav bar color</p>
          {makePicker(this, colors, 'menuColor')}
        </div>
        <div style={{width: 15}}/>
        <div style={{width: 150}}>
          <p>menu button color</p>
          {makePicker(this, colors, 'buttonColor')}
        </div>
      </div>        
      )      
    }
    render() {
        return (
          <div style={{paddingTop: 40}}>
            <SersNavbarMenu bgColor={this.state.navBarColor} menuColor={this.state.navButtonColor}/>
            <p style={{paddingTop: 30}} className="">
              Welcome to Safe Family Ministries, {this.props.user.firstName} {this.props.user.lastName}
            </p>
            <div style={{height: 50}}></div>
            {this.props.enablePicker && this.renderColorPicker()}
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
    menuColor: state.homepage.menuColor,
    buttonColor: state.homepage.buttonColor,
    enablePicker: state.homepage.enablePicker
  }
}

export default connect(mapStateToProps, null)(HomePage)


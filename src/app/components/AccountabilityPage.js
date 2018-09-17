import React from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import SersNavbarMenu from './SersNavbarMenu'

const menuItems = [
{ text: 'Return',url: '/'},
{ text: 'Daily Entry',url: ''},
{ text: 'New Month',url: ''},
{ text: 'Reports',url: ''},
{ text: 'Daily Happenings',url: ''},
]

class AccountabilityPage extends React.Component {

    render() {
        return (
          <div style={{paddingTop: 55}}>
            <SersNavbarMenu title={"Accountability"}/>
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps, null)(AccountabilityPage)


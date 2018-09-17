import React from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import SersNavbarMenu from './SersNavbarMenu'

const menuItems = [
{ text: 'Return',url: '/'},
{ text: 'New Reminder',url: ''},
]

class RemindersPage extends React.Component {

    render() {
        return (
          <div style={{paddingTop: 40}}>
            <SersNavbarMenu  />
            <p> the reminders page</p>
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps, null)(RemindersPage)


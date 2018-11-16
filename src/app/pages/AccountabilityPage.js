import React from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import SersNavbarMenu from '../components/SersNavbarMenu'

class AccountabilityPage extends React.Component {

  render() {
    return (
      <div style={{paddingTop: 48}}>
        <SersNavbarMenu/>
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

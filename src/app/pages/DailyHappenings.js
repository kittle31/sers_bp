import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import moment from "moment"
import {loadHappenings} from "../state/accountability/actions"

import SersNavbarMenu from '../components/SersNavbarMenu'
import { SpacerUp } from '../util/spacer'
import { Button } from '@blueprintjs/core';

class DailyHappenings extends React.Component {
  constructor(){
    super()
    this.state={
      batchSize: 10
    }
  }
  componentWillMount(){
    this.props.loadHappenings(this.state.batchSize)
  }

  handleBatchSize = (event) => {
    this.setState({batchSize: event.target.value})
  }

  getHappenings(){
    return this.props.happenings.map( (item, i) => {
      return (
      <div key={i} style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{flexGrow: 1}}/>
          <h4>{item.creationDate.toString()} &nbsp; {item.createdBy}</h4>
        </div>
        <p>{item.notes}</p>
      </div>)
    })
  }

  render() {
    const msg = "Daily Happenings for " + moment().format('MMMM D, YYYY')
    return (
      <div style={{paddingTop: 48}}>
        <SersNavbarMenu/>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'lightgrey'}}>
          <h3>{msg}</h3>
          <div style={{display: 'flex', flexDirection: 'row', borderBottom: '2px solid black', paddingBottom: 5}}>
            <div style={{display: 'flex', flexDirection: 'column', height: 250, padding: 5}}>
              <strong style={{textAlign: 'end'}}>Note</strong>
              <SpacerUp size={50}/>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div>Display last</div>
                <select style={{marginLeft: 5, marginRight: 5}}
                        value={this.state.batchSize}
                        onChange={this.handleBatchSize}>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
                <div>Entries</div>
              </div>
              <SpacerUp size={10}/>
              <Button intent="primary">Save</Button>
            </div>
            <textarea style={{width: '75%', height: 250}}/>
          </div>
        </div>
        <div style={{backgroundColor: 'lightgrey'}}>
        {this.getHappenings()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    happenings: state.accountability.happenings
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {
    loadHappenings
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyHappenings)

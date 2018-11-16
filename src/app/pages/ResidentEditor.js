import React from "react"
import moment from 'moment'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Button, Intent} from "@blueprintjs/core"

import SersNavbarMenu from '../components/SersNavbarMenu'
import PhoneEditor from '../components/PhoneEditor'
import AddressEditor from '../components/AddressEditor'
import { getGlobalStore } from "../state/globalStore"
import * as types from "../state/actionTypes"
import {getResident, saveResident, newResident, saveNewResident} from "../state/residents/actions"
import {makeTextInput, makeDateInput, makeCheckboxInput} from "../util/UIUtil"
import {AppToaster} from "../util/toaster"
import { SpacerSide } from "../util/spacer";

class ResidentEditor extends React.Component {
    constructor(){
        super()
        this.state = {
          res: null
            }
        }

    momentFromGs(date){
      if (!date || !date.year || !date.dayOfYear)
         return null
      return moment().year(date.year).dayOfYear(date.dayOfYear).toDate()
    }

  componentWillMount(){
    if (this.props.match.url == '/residents/edit'){
      if (!this.props.selected){
          const menu = getGlobalStore().getState().homepage.selectedMenu
          this.gotoResidentPage()
          getGlobalStore().dispatch({type: types.MENU_NEXT, payload: menu})
          AppToaster.show({message: 'Select a Resident to edit', intent: Intent.PRIMARY, timeout: 0 })
      }
    }
    if (this.props.match.url == '/residents/new'){
    }
       this.props.newResident()
  }

  componentDidMount(){
    if (this.props.selected && this.props.selected.oop){
        this.props.getResident(this.props.selected.oop)
        AppToaster.clear()
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.resident != this.props.resident)
      this.setState({res: newProps.resident})
  }

  handleValueChanged(field, event){
    this.setState({res: {
      ...this.state.res,
      [field] : event.target.value
    }})
  }

  handleDateChanged(field, date){
    this.setState({res: {
      ...this.state.res,
      [field] : date
    }})
  }

  handleSaveResident(){
    if (this.props.match.url == '/residents/edit'){
      this.props.saveResident(this.state.res)
    }
    if (this.props.match.url == '/residents/new'){
      this.props.saveNewResident(this.state.res)
   }
    this.gotoResidentPage()
  }

  gotoResidentPage(){
    const resMenu = getGlobalStore().getState().homepage.residentMenu
    getGlobalStore().dispatch({type: types.MENU_SELECTED, payload: resMenu})
  }

  render(){
    let sel = this.state.res || {}
    return(
      <div style={{paddingTop: 48}}>
        <SersNavbarMenu/>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: 200}}>
          <Button intent="primary"
                  onClick={this.handleSaveResident.bind(this)}>Save</Button>
          <Button intent="warning"
                  onClick={this.gotoResidentPage}>Cancel</Button>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {makeTextInput(this, sel, "firstName", "First Name", 250)}
            {makeTextInput(this, sel, "referredBy", "Reffered By")}
            <PhoneEditor self={this} state={sel} field={'homePhone'} label="Home Phone"/>
            {makeTextInput(this, sel, "emContact", "Emergency Contact")}
            {makeDateInput(this, sel, "birthdate", "DOB")}
            {makeTextInput(this, sel, "allergy", "Allergy")}
            {makeTextInput(this, sel, "ssn", "Ssn")}
        </div>
        <SpacerSide size={15}/>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {makeTextInput(this, sel, "lastName", "Last Name", 250)}
            <PhoneEditor self={this} state={sel} field={'referredPhone'} label="Referred Phone"/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              {makeDateInput(this, sel,  "startDate", "Start Date")}
              <div style={{display: 'flex', flexDirection: 'column'}}>
                {makeDateInput(this, sel,  "exitDate", "Exit Date")}
                {makeCheckboxInput(this, sel,  "active", "Active")}
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <PhoneEditor self={this} state={sel} field={'cellPhone'} label="Cell Phone"/>
              <PhoneEditor self={this} state={sel} field={'messagePhone'} label="Message Phone"/>
            </div>
            <PhoneEditor self={this} state={sel} field={'emPhone'} label="Emergency Phone"/>
            </div>
        </div>
        <AddressEditor self={this} state={sel} field={'address'}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
      selected: state.residents.selected,
      resident: state.residents.fullResident
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators( {
      getResident,
      saveResident,
      newResident,
      saveNewResident
    }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ResidentEditor)

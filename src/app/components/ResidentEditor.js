import React from "react"
import moment from 'moment'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {InputGroup, Button} from "@blueprintjs/core"
import {DateInput} from "@blueprintjs/datetime"

import SersNavbarMenu from './SersNavbarMenu'
import { getGlobalStore } from "../state/globalStore"
import * as types from "../state/actionTypes"
import {getResident, saveResident} from "../state/residents/actions"

class ResidentEditor extends React.Component {
    constructor(){
        super()
        this.state = {
            res: {
              firstName: '',
              lastName: '',
            }
        }
    }

    momentFromGs(date){
      if (!date || !date.year || !date.dayOfYear)  
         return null
      return moment().year(date.year).dayOfYear(date.dayOfYear).toDate()
    }

  componentWillReceiveProps(newProps){
    if (newProps.resident != this.props.resident) {
      this.state.res =  newProps.resident
      this.state.res.startDateM = this.momentFromGs(newProps.resident.startDate)
      this.state.res.exitDateM = this.momentFromGs(newProps.resident.exitDate)
      this.state.res.birthdateM = this.momentFromGs(newProps.resident.birthdate)
    }
  }

  componentWillMount(){
    if (!this.props.selected.firstName){        
        this.gotoResidentPage()
        const menu = getGlobalStore().getState().homepage.selectedMenu
        getGlobalStore().dispatch({type: types.MENU_NEXT, payload: menu})
    }
  }

  componentDidMount(){
    if (this.props.selected && this.props.selected.oop){
        this.props.getResident(this.props.selected.oop)
    }
  }
    
  getMomentFormatter() {
    const format = "MMM D, YYYY"
    return {
        formatDate: (date, locale) => moment(date).format(format),
        parseDate: (str, locale) => moment(str, format).toDate()
    }
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
    this.props.saveResident(this.state.res)
    this.gotoResidentPage()
  }

  gotoResidentPage(){
    const resMenu = getGlobalStore().getState().homepage.residentMenu
    getGlobalStore().dispatch({type: types.MENU_SELECTED, payload: resMenu})
  }

  makeTextInput(field, label){
    return (
      <div style={{padding: 5, width: 250}}>
    <InputGroup value={this.state.res[field]} placeholder={label}
                onChange={this.handleValueChanged.bind(this, field)}
                />
    </div>
    )
  }

  makeDateInput(field, label){
    return(<div style={{padding: 5, display: 'flex', flexDirection: 'column'}}>
      <label>{label}</label>
      <DateInput value={this.state.res[field]} placeholder={label}
                 large={true}
                 minDate={new Date(0)} 
                 onChange={this.handleDateChanged.bind(this, field)}
          {...this.getMomentFormatter()} />
    </div>
    )
  }

  render(){
    return(
      <div style={{paddingTop: 40}}>
        <SersNavbarMenu/>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: 200}}>
          <Button intent="primary"
                  onClick={this.handleSaveResident.bind(this)}
          >Save</Button>
          <Button intent="warning"
                  onClick={this.gotoResidentPage}
          >Cancel</Button>
        </div>        
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {this.makeTextInput("firstName", "First Name")}
            {this.makeTextInput("lastName", "Last Name")}
            <div style={{display: 'flex', flexDirection: 'row'}}>
              {this.makeDateInput("startDateM", "Start Date")}
              {this.makeDateInput("exitDateM", "Exit Date")}
            </div>
            {this.makeDateInput("birthdateM", "DOB")}
            {this.makeTextInput("ssn", "Ssn")}
        </div>
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
      saveResident
    }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ResidentEditor)
  
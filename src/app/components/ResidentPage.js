import React from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {InputGroup, Icon, Tooltip, Button} from "@blueprintjs/core"
import moment from 'moment'

import * as types from '../state/actionTypes'
import SersNavbarMenu from './SersNavbarMenu'
import { getGlobalStore } from '../state/globalStore'
import { loadResidents } from '../state/residents/actions'
import { SpacerSide, SpacerUp } from '../util/spacer';

class ResidentPage extends React.Component {
    constructor(){
      super()
      this.state = {
        filter: ''
      }
    }

    componentDidMount(){
        this.props.loadResidents()
    }

    handleFilter(event){
      this.setState({filter: event.target.value})
    }

    handleResidentClick(resident, event){
      getGlobalStore().dispatch({type: types.RESIDENT_SELECTED, payload: resident})
      const nextMenu = getGlobalStore().getState().homepage.nextMenu
      if (nextMenu){
        getGlobalStore().dispatch({type: types.MENU_SELECTED, payload: nextMenu} )
      }
    }

    handleEditResident(resident,  event){
      if (resident != this.props.selected)
        getGlobalStore().dispatch({type: types.RESIDENT_SELECTED, payload: resident})
      const residentEdit = getGlobalStore().getState().homepage.residentMenu.items[1]      
      getGlobalStore().dispatch({type: types.MENU_SELECTED, payload: residentEdit})
    }

    getResidentData(){
      const filter = this.state.filter.toLowerCase()
      const filtered = this.props.residents.filter( (res) => {
        return res.firstName.toLowerCase().indexOf(filter) >=0 || res.lastName.toLowerCase().indexOf(filter) >=0
      })
      return filtered.map( (res, i) => {
          const cls = (res == this.props.selected) ? "resident-row-selected" : "resident-row"
          return (<div key={i} className={cls} style={{display: 'flex', flexDirection: 'row', padding: 3}}
                       >
            <Tooltip content="Edit">
              <Icon icon="edit"
                    onClick={this.handleEditResident.bind(this, res)}
              />
            </Tooltip>
            <div style={{display: 'flex', flexDirection: 'row'}} onClick={this.handleResidentClick.bind(this, res)}>
              <div style={{paddingLeft: 10}}>{res.firstName}</div>
              &nbsp;
              <div>{res.lastName}</div>
            </div>
          </div>)
      })
    }

    getField(value, title){      
      return (
        <div style={{height: 60, width: 200, padding: 10, margin: 5, border: '1px solid grey'}}>
          <label className="bp3-text-muted">{title}</label>
          <div>{value}</div>
        </div>
      )
    }

    getDateField(value, title){
      if (!value)
        return this.getField("", title)
      const date = moment().year(value.year).dayOfYear(value.dayOfYear)
      return this.getField(date.format("MMM D, YYYY"), title)
    }

    getPhoneField(value, title){
      if (!value || !value.areaCode)
        return this.getField("", title)
      const phone = "("+value.areaCode+")-"+value.prefix+"-"+value.suffix
      return this.getField( phone , title)
    }

    getEditButton(){
      if (!this.props.selected.oop)
      return null

      return (
        <Button style={{height: 50}} 
                onClick={this.handleEditResident.bind(this, this.props.selected)}
        intent="primary" >Edit</Button>
      )
    }

    render() {
        const cardStyle={margin: 10}
        return (
          <div style={{paddingTop: 40}}>
            <SersNavbarMenu/>
            <div style={{display: 'flex', flexDirection: 'row'}} className="bp3-text-large" >
              <div style={{border: '1px solid black', width: 250, padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{fontWeight: 'bold', paddingTop: 5, paddingBottom: 5}}>Search</div>
                <InputGroup type="search" style={{width: '100%', margin: 5}} value={this.state.filter} placeholder="Search"
                       onChange={this.handleFilter.bind(this)}
                />
                <div style={{paddingTop: 5, paddingBottom: 5}}> <input type="checkbox"/> Include Inactive Residents</div>
                <div style={{display: 'flex', flexDirection: 'column', paddingTop: 10, width: '100%', borderTop: '2px solid'}}>
                  <div style={{fontWeight: 'bold'}}>Resident List</div>
                  {this.getResidentData()}
                </div>
              </div>
              <SpacerSide size={30}/>
              <div style={{display: 'flex', flexDirection: 'column', }}>
                  {this.getField(this.props.selected.firstName, "First Name")}
                  {this.getField(this.props.selected.referredBy, "Reffered By")}
                  {this.getPhoneField(this.props.selected.homePhone, "Home Phone")}
                  {this.getPhoneField(this.props.selected.emContact, "Emergency Contact")}
                  {this.getDateField(this.props.selected.birthdate, "DOB")}
                  {this.getField(this.props.selected.allergy, "Allergy")}
              </div>
              <SpacerSide size={15}/>
              <div style={{display: 'flex', flexDirection: 'column', }}>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    {this.getField(this.props.selected.lastName, "Last Name")}
                    {this.getEditButton()}                    
                  </div>
                  {this.getPhoneField(this.props.selected.referredPhone, "Reffered Phone")}
                  <SpacerUp size={20}/>
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    {this.getDateField(this.props.selected.startDate, "Start Date")}
                    {this.getDateField(this.props.selected.exitDate, "Exit Date")}
                  </div>
                  <SpacerUp size={20}/>
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    {this.getPhoneField(this.props.selected.cellPhone, "Cell Phone")}
                    {this.getPhoneField(this.props.selected.messagePhone, "Message Phone")}
                  </div>
                  {this.getPhoneField(this.props.selected.emContactPhone, "Emergency Phone")}
              </div>
            </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
    residents: state.residents.data,
    selected: state.residents.selected
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators( {
    loadResidents
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResidentPage)

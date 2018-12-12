import React from 'react'
import moment from 'moment'

import {InputGroup, Switch, Checkbox} from "@blueprintjs/core"
import {DateInput} from "@blueprintjs/datetime"

function momentFromGs(date){
  if (!date || !date.year || !date.dayOfYear)
     return null
  return moment().year(date.year).dayOfYear(date.dayOfYear).toDate()
}

function getMomentFormatter() {
  const format = "MMM D, YYYY"
  return {
      formatDate: (date, locale) => {
        return moment(date).format(format)
      },
      parseDate: (str, locale) => {
        return moment(str, format).toDate()
      }
  }
}


export const makeTextInput = (self, state, field, label, width, tabIndex) =>{
  return (
    <div style={{padding: 5, display: 'flex', flexDirection: 'column', width: width}}>
      <label style={{paddingLeft: 5}}>{label}</label>
      <InputGroup value={state[field] || ''} placeholder={label}
              onChange={self.handleValueChanged.bind(self, field)}
              />
    </div>
  )
}

export const makeDateInput = (self, state, field, label, width, tabIndex) => {
  let dateValue = state[field]
  let date
  if (dateValue && dateValue.indexOf && dateValue.indexOf("-") > 0)
    date = moment(dateValue, 'MM-DD-YYYY').toDate()
  else
    date = dateValue

  return(
    <div style={{padding: 5, display: 'flex', flexDirection: 'column'}}>
      <label style={{paddingLeft: 5}}>{label}</label>
      <DateInput value={date } placeholder={label}
               large={true}
               minDate={new Date(1950)}
               onChange={self.handleDateChanged.bind(self, field)}
      {...getMomentFormatter()} />
    </div>
  )
}

export const handleCheckbox = (self, field, event) => {
  //convert to boolean
  const evt = {target: {value: event.target.checked}}
  self.handleValueChanged(field, evt )
}

export const makeCheckboxInput = (self, state, field, label) => {
  const value = state[field]
  if (value == undefined)
     return null

  return (
    <Switch style={{paddingLeft: 50}} checked = {value} onChange={handleCheckbox.bind(this, self, field)}
              label={label}/>
  )
}
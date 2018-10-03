import React from 'react'
import moment from 'moment'

import {InputGroup, NumericInput} from "@blueprintjs/core"
import {DateInput} from "@blueprintjs/datetime"

function momentFromGs(date){
  if (!date || !date.year || !date.dayOfYear)
     return null
  return moment().year(date.year).dayOfYear(date.dayOfYear).toDate()
}

function getMomentFormatter() {
  const format = "MMM D, YYYY"
  return {
      formatDate: (date, locale) => moment(date).format(format),
      parseDate: (str, locale) => moment(str, format).toDate()
  }
}


export const makeTextInput = (self, state, field, label, width) =>{
  return (
    <div style={{padding: 5, width: 250, display: 'flex', flexDirection: 'column', width: width}}>
      <label style={{paddingLeft: 5}}>{label}</label>
      <InputGroup value={state[field] || ''} placeholder={label}
              onChange={self.handleValueChanged.bind(self, field)}
              />
    </div>
  )
}

export const makeDateInput = (self, state, field, label) => {
  let dateValue = state[field]
  let date
  if (dateValue && dateValue.dayOfYear)
    date = momentFromGs(dateValue)
  else
    date = dateValue

  return(
    <div style={{padding: 5, display: 'flex', flexDirection: 'column', width: '100%'}}>
      <label style={{paddingLeft: 5}}>{label}</label>
      <DateInput value={date } placeholder={label}
               large={true}
               minDate={new Date(0)}
               onChange={self.handleDateChanged.bind(self, field)}
      {...getMomentFormatter()} />
    </div>
  )
}
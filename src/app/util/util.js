import React from 'react';
import {Button} from '@blueprintjs/core'

import { getGlobalStore } from '../state/globalStore'
import * as types from '../state/actionTypes'

export const makePicker = (self, cols, prop) => {
    const value = getGlobalStore().getState().homepage[prop]
    const buttons = Object.keys(cols).map( (key, i) => {
        let text=key
        if (value == cols[key])
          text += " <<=="
        return <Button style={{backgroundColor: cols[key]}}
                       text={text}
                       key={i}
                       onClick={ () => {
                         getGlobalStore().dispatch({
                           type: types.SET_COLOR, payload: prop, color: cols[key]
                         })                         
                        }}/>
    })
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {buttons}
      </div>
    )
  }

function daysIntoYear(date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

export const momentToGs  =(aMoment) => {
  if (!aMoment)
    return null

  let gs = {
    year: aMoment.getFullYear(),
    dayOfYear: daysIntoYear(aMoment)
  }

  return gs
}
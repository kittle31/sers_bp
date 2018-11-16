import axios from 'axios'
import * as types from '../actionTypes'
import {momentToGs} from "../../util/util"

const url = '/sers-api/resident'
export const loadResidents = () => {
  return async (dispatch, getState) => {
    dispatch( {type: types.RESIDENTS_LOADED, payload: []} )
    const response = await axios.post(url, {oper: 'list'} )
    dispatch( {type: types.RESIDENTS_LOADED, payload: response.data.resp} )

    //update selected resident
    const sel = getState().residents.selected
    if (sel){
      const newSel = response.data.resp.find( (res) => res.oop == sel.oop)
      dispatch({type: types.RESIDENT_SELECTED, payload: newSel})
    }
  };
}

export const getResident = (id) => {
  return async (dispatch) => {
    const response = await axios.post(url, {oper: 'get', oop: id} )
    dispatch( {type: types.RESIDENT_LOADED, payload: response.data.resp} )
  };
}

export const saveResident = (res) => {
  return async (dispatch) => {
    const response = await axios.post(url, {oper: 'save', resident: res})
  }
}

export const saveNewResident = (res) => {
  return async (dispatch) => {
    const response = await axios.post(url, {oper: 'saveNew', resident: res})
  }
}

export const newResident = () => {
  return async (dispatch) => {
    const response = await axios.post(url, {oper: 'new'})
    dispatch({type: types.RESIDENT_LOADED, payload: response.data.resp})
  }
}

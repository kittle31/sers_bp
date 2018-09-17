import axios from 'axios'
import * as types from '../actionTypes'
import {momentToGs} from "../../util/util"

const url = '/sers-api/resident'
export const loadResidents = () => {
  return async (dispatch) => {
    const url = '/sers-api/resident'
    const response = await axios.post(url, {oper: 'list'} )

    dispatch( {type: types.RESIDENTS_LOADED, payload: response.data.resp} )
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
    //transform moment dates to gs dates
    res.birthdate = momentToGs(res.birthdateM)
    res.startDate = momentToGs(res.startDateM)
    res.exitDate = momentToGs(res.exitDateM)
    const response = await axios.post(url, {oper: 'save', resident: res})
  }
}

import axios from 'axios'
import * as types from '../actionTypes'

const url = '/sers-api/accountability'

export const loadHappenings = (batch) => {
    return async (dispatch) => {
      const response = await axios.post(url, {oper: 'happenings', batch: batch, entries: batch} )
      dispatch( {type: types.HAPPENINGS_LOADED, payload: response.data.resp} )
    };
  }


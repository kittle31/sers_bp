import axios from 'axios'
import * as types from '../actionTypes'

export const doLogin = (user, pass) => {
  return async (dispatch) => {
    const response = await axios.post('/sers-api/login', {user: user, pass: pass} )
    dispatch( {type: types.USER_LOGIN_SUCCESS, payload: response.data} )
  };
}

import * as types from '../actionTypes'

const initialState = {
  user: {
   userId: '',
   userName: '',
  },
  auth: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        auth: true
      }
    }
    case types.USER_LOGOUT: {
      return {
        ...state,
        user: null,
        auth: false
      }
    }
    default:
      return state
  }
}

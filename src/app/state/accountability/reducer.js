import * as types from '../actionTypes'

const initialState = {
  happenings: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.HAPPENINGS_LOADED: {
      return {
        ...state,
        happenings: action.payload
      }
    }
    case types.HAPPENINGS_ADDED: {
      const col = state.happenings.concat(action.payload)
      return {
        ...state,
        happenings: col
      }
    }
    default:
      return state
  }
}

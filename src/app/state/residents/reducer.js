import * as types from '../actionTypes'

const initialState = {
    data: [],
    selected: null,
    fullResident: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.RESIDENTS_LOADED: {
      return {
        ...state,
        data: action.payload
      }
    }
    case types.RESIDENT_LOADED: {
      return {
        ...state,
        fullResident: action.payload
      }
    }
    case types.RESIDENT_SELECTED: {
      return {
        ...state,
        selected: action.payload
      }
    }
    default:
      return state
  }
}

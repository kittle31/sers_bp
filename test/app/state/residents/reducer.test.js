import * as types from '../../../../src/app/state/actionTypes'
import reducer from '../../../../src/app/state/residents/reducer'

describe('resident reducer', () => {
  const initialState = {
    data: [],
    selected: null,
    fullResident: {}
}

  const initialStateClone = JSON.parse(JSON.stringify(initialState))

  function checkReducer(reducer, action, newState) {
    expect(reducer(initialState, action)).toEqual(newState)

    // test that initialState is not mutated
    expect(initialState).toEqual(initialStateClone)
  }

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

})

import * as types from '../../../../src/app/state/actionTypes'
import reducer from '../../../../src/app/state/accountability/reducer'

describe('accountability reducer', () => {

  const initialState = {
    happenings: []
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

  it('handles HAPPENINGS_LOADED', ()=>{
    const action = {type: types.HAPPENINGS_LOADED, payload: 'data'}
    const newState = {
      ...initialState,
      happenings: 'data'
    }
    checkReducer(reducer, action, newState)
  })

  it('handles HAPPENINGS_ADDED', ()=>{
    const action = {type: types.HAPPENINGS_ADDED, payload: 'data'}
    const newState = {
      ...initialState,
      happenings: ['data']
    }
    checkReducer(reducer, action, newState)
  })
})

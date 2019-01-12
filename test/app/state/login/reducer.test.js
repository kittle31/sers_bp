import * as types from '../../../../src/app/state/actionTypes'
import reducer from '../../../../src/app/state/login/reducer'

describe('login reducer', () => {

  const initialState = {
    user: {
      userId: '',
      userName: '',
     },
     auth: false
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

  it('handles user login', ()=>{
    const action = {type: types.USER_LOGIN_SUCCESS, payload: 'user'}
    const newState = {
      ...initialState,
      user: 'user',
      auth: true
    }
    checkReducer(reducer, action, newState)
  })

  it('handles user logout', ()=>{
    const action = {type: types.USER_LOGOUT}
    const newState = {
      ...initialState,
      user: null,
      auth: false
    }
    checkReducer(reducer, action, newState)
  })

})

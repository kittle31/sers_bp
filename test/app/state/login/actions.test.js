import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import axios from 'axios'
import * as types from '../../../../src/app/state/actionTypes'
import * as actions from "../../../../src/app/state/login/actions"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('login actions', ()=>{
  let store
  beforeEach( ()=> {
    jest.resetAllMocks()
    store = mockStore({})
  })

  it('calls login', () => {
    jest.spyOn(axios, 'post').mockReturnValue( {user: 'data'})
    const expectedActions = [
      {type: types.USER_LOGIN_SUCCESS}
    ]

    return store.dispatch(actions.doLogin("user", "pass")).then(
      () => {
        expect(store.getActions()).toEqual(expectedActions)
        expect(axios.post).toHaveBeenCalledWith('/sers-api/login', {user: 'user', pass: 'pass'})
      }
    )
  })
})
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import axios from 'axios'
import * as types from '../../../../src/app/state/actionTypes'
import * as actions from "../../../../src/app/state/login/actions"
import { checkActionFn } from '../../../testUtils'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('login actions', ()=>{
  let store, checkAction
  beforeEach( ()=> {
    jest.resetAllMocks()
    store = mockStore({})
    checkAction = checkActionFn.bind( "ignored", actions, store)
  })

  it('calls login', () => {
    jest.spyOn(axios, 'post').mockReturnValue( {user: 'data'})
    const expectedActions = [
      {type: types.USER_LOGIN_SUCCESS}
    ]

    return checkAction("doLogin", ["user", "pass"],
    expectedActions,
    '/sers-api/login', {user: 'user', pass: 'pass'}
    )
  })
})
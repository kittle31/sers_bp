import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import axios from 'axios'
import * as types from '../../../../src/app/state/actionTypes'
import * as actions from "../../../../src/app/state/accountability/actions"
import { checkActionFn } from '../../../testUtils'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('accountability actions', () => {
  let store, checkAction

  beforeEach( ()=> {
    jest.resetAllMocks()
    store = mockStore({})
    checkAction = checkActionFn.bind( "ignored", actions, store)
  })

  it('loads existing daily happenings', () => {
    jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'data'}})
    const expectedActions = [
      {payload: "data", type: types.HAPPENINGS_LOADED}
  ]

    return checkAction('loadHappenings', [3],
      expectedActions,
      '/sers-api/accountability', {batch: 3, entries: 3, oper: 'happenings'}
    )
  })

  it('saves a new happening', () => {
    jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'data'}})
    return checkAction('saveHappening', ['data'],
      [],
      '/sers-api/accountability', {oper: 'save', data: 'data'}
    )
  })

})
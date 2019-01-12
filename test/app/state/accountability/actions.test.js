import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import axios from 'axios'
import * as types from '../../../../src/app/state/actionTypes'
import * as actions from "../../../../src/app/state/accountability/actions"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('accountability actions', () => {
  let store
  beforeEach( ()=> {
    jest.resetAllMocks()
    store = mockStore({})
  })

  it('loads existing daily happenings', () => {
    jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'data'}})
    const expectedActions = [
      {"payload": "data", "type": "HAPPENINGS_LOADED"}
  ]

    return store.dispatch(actions.loadHappenings(3)).then(
      () => {
        expect(store.getActions()).toEqual(expectedActions)
        expect(axios.post).toHaveBeenCalledWith('/sers-api/accountability', {batch: 3, entries: 3, oper: 'happenings'})
      }
    )
  })

  it('saves a new happening', () => {
    jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'data'}})

    return store.dispatch(actions.saveHappening('data')).then(
      () => {
        expect(store.getActions()).toEqual([])
        expect(axios.post).toHaveBeenCalledWith('/sers-api/accountability', {oper: 'save', data: 'data'})
      }
    )
  })

})
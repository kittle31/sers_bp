import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import axios from 'axios'
import * as types from '../../../../src/app/state/actionTypes'
import * as actions from "../../../../src/app/state/residents/actions"
import { checkActionFn } from '../../../testUtils'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('resident actions', ()=>{
  let store, checkAction
  beforeEach( ()=> {
    jest.resetAllMocks()
    store = mockStore({
      residents: {}
    })
    checkAction = checkActionFn.bind( "ignored", actions, store)
  })

    it('loads residents', () =>{
      jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'resident data'}})
      const expectedActions = [
        {type: types.RESIDENTS_LOADED, payload: []},
        {type: types.RESIDENTS_LOADED, payload: 'resident data'}
      ]
      return checkAction("loadResidents", [],
        expectedActions,
        '/sers-api/resident', {oper: 'list'}
      )
    })

    it('gets a single resident', () =>{
      jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'resident data'}})
      const expectedActions = [
        {type: types.RESIDENT_LOADED, payload: 'resident data'}
      ]
      return checkAction("getResident", [1234],
        expectedActions,
        '/sers-api/resident', {oper: 'get', oop: 1234}
      )
    })

    it('saves an existing resident', () =>{
      jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'resident data'}})
      return checkAction("saveResident", ["resident obj"],
        [],
        '/sers-api/resident', {oper: 'save', resident: 'resident obj'}
      )
    })

    it('gets a new resident', () =>{
      jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'resident data'}})
      const expectedActions = [
        {type: types.RESIDENT_LOADED, payload: 'resident data'}
      ]
      return checkAction("newResident", ["resident obj"],
        expectedActions,
        '/sers-api/resident', {oper: 'new'}
        )
    })

    it('saves a new resident', () =>{
      jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'resident data'}})
      return checkAction("saveNewResident", ["resident obj"],
        [],
        '/sers-api/resident', {oper: 'saveNew', resident: 'resident obj'}
        )
    })
})

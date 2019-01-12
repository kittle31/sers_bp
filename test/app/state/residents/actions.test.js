import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import axios from 'axios'
import * as types from '../../../../src/app/state/actionTypes'
import * as actions from "../../../../src/app/state/residents/actions"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('resident actions', ()=>{
  let store
  beforeEach( ()=> {
    jest.resetAllMocks()
    store = mockStore({
      residents: {}
    })
  })

    it('loads residents', () =>{
      jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'resident data'}})
      const expectedActions = [
        {type: types.RESIDENTS_LOADED, payload: []},
        {type: types.RESIDENTS_LOADED, payload: 'resident data'}
      ]
      return store.dispatch(actions.loadResidents()).then(
        () => {
          expect(store.getActions()).toEqual(expectedActions)
          expect(axios.post).toHaveBeenCalledWith('/sers-api/resident', {oper: 'list'})
        }
      )
    })

    it('gets a single resident', () =>{
      jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'resident data'}})
      const expectedActions = [
        {type: types.RESIDENT_LOADED, payload: 'resident data'}
      ]
      return store.dispatch(actions.getResident(1234)).then(
        () => {
          expect(store.getActions()).toEqual(expectedActions)
          expect(axios.post).toHaveBeenCalledWith('/sers-api/resident', {oper: 'get', oop: 1234})
        }
      )
    })

    it('saves an existing resident', () =>{
      jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'resident data'}})
      const expectedActions = [ ]
      return store.dispatch(actions.saveResident('resident obj')).then(
        () => {
          expect(store.getActions()).toEqual(expectedActions)
          expect(axios.post).toHaveBeenCalledWith('/sers-api/resident', {oper: 'save', resident: 'resident obj'})
        }
      )
    })

    it('gets a new resident', () =>{
      jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'resident data'}})
      const expectedActions = [
        {type: types.RESIDENT_LOADED, payload: 'resident data'}
    ]
      return store.dispatch(actions.newResident('resident obj')).then(
        () => {
          expect(store.getActions()).toEqual(expectedActions)
          expect(axios.post).toHaveBeenCalledWith('/sers-api/resident', {oper: 'new'})
        }
      )
    })

    it('saves a new resident', () =>{
      jest.spyOn(axios, 'post').mockReturnValue( {data: { resp: 'resident data'}})
      const expectedActions = [ ]
      return store.dispatch(actions.saveNewResident('resident obj')).then(
        () => {
          expect(store.getActions()).toEqual(expectedActions)
          expect(axios.post).toHaveBeenCalledWith('/sers-api/resident', {oper: 'saveNew', resident: 'resident obj'})
        }
      )
    })
})

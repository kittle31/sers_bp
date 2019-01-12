import * as types from '../../../../src/app/state/actionTypes'
import reducer from '../../../../src/app/state/homepage/reducer'

describe('accountability reducer', () => {
  let initialState, initialStateClone

  beforeEach( () => {
    initialState = {
      "accountabilityMenu": {
        "items": [
          { "text": "Daily Entry" },
          { "text": "New Month" },
          {
            "items": [{ "text": "Monthly" }, { "text": "30 days" },
            { "text": "Year to date" }], "text": "Reports"
          },
          { "text": "Daily Happenings", "url": "/accountability/happenings" }
        ], "text": "Accountability", "url": "/accountability"
      },
      "announcementsMenu": {
        "text": "Announcements"
      },
      "buttonColor": "#E8F9B6",
      "dataManagerMenu": { "text": "Data Manager" },
      "enablePicker": false,
      "menu": {
        "items": [
          {
            "items": [
              { "text": "New Resident", "url": "/residents/new" },
              { "text": "Edit", "url": "/residents/edit" },
              { "items": [{ "text": "new" }], "text": "Counsel Notes" },
              { "items": [{ "text": "Print" }], "text": "Schedule" },
              { "text": "Accountability" }
            ],
            "text": "Residents",
            "url": "/residents"
          },
          {
            "items": [
              { "text": "Daily Entry" },
              { "text": "New Month" },
              {
                "items": [
                  { "text": "Monthly" },
                  { "text": "30 days" },
                  { "text": "Year to date" }
                ],
                "text": "Reports"
              },
              { "text": "Daily Happenings", "url": "/accountability/happenings" }],
            "text": "Accountability", "url": "/accountability"
          },
          {
            "items": [{ "text": "New Reminder", "url": "" }],
            "text": "Reminders", "url": "/reminders"
          },
          { "text": "Announcements" },
          { "text": "Scheduling" },
          { "text": "Data Manager" }
        ], "text": "homepage", "url": "/"
      },
      "menuColor": "#ADC16D",
      "nextMenu": null,
      "remindersMenu": {
        "items": [{ "text": "New Reminder", "url": "" }],
        "text": "Reminders",
        "url": "/reminders"
      },
      "residentMenu": {
        "items": [
          { "text": "New Resident", "url": "/residents/new" },
          { "text": "Edit", "url": "/residents/edit" },
          { "items": [{ "text": "new" }], "text": "Counsel Notes" },
          { "items": [{ "text": "Print" }], "text": "Schedule" },
          { "text": "Accountability" }
        ],
        "text": "Residents",
        "url": "/residents"
      },
      "scheduleMenu": { "text": "Scheduling" },
      "selectedMenu": {
        "items": [
          {
            "items": [
              { "text": "New Resident", "url": "/residents/new" },
              { "text": "Edit", "url": "/residents/edit" },
              { "items": [{ "text": "new" }], "text": "Counsel Notes" },
              { "items": [{ "text": "Print" }], "text": "Schedule" },
              { "text": "Accountability" }
            ],
            "text": "Residents",
            "url": "/residents"
          },
          {
            "items": [
              { "text": "Daily Entry" },
              { "text": "New Month" },
              {
                "items": [
                  { "text": "Monthly" },
                  { "text": "30 days" },
                  { "text": "Year to date" }
                ], "text": "Reports"
              },
              { "text": "Daily Happenings", "url": "/accountability/happenings" }
            ], "text": "Accountability", "url": "/accountability"
          },
          {
            "items": [{ "text": "New Reminder", "url": "" }],
            "text": "Reminders", "url": "/reminders"
          },
          { "text": "Announcements" },
          { "text": "Scheduling" },
          { "text": "Data Manager" }
        ],
        "text": "homepage",
        "url": "/"
      },
      "tmpColor": "#ADC16D"
    }
   initialStateClone = JSON.parse(JSON.stringify(initialState))
  })

  function checkReducer(reducer, action, newState) {
    expect(reducer(initialState, action)).toEqual(newState)

    // test that initialState is not mutated
    expect(initialState).toEqual(initialStateClone)
  }

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('handles MENU_SELECTED', () => {
    const action = { type: types.MENU_SELECTED, payload: 'data' }
    const newState = {
      ...initialState,
      selectedMenu: 'data'
    }
    checkReducer(reducer, action, newState)
  })

  it('handles MENU_HOME', () => {
    const action = { type: types.MENU_HOME, payload: 'data' }
    const newState = {
      ...initialState,
      selectedMenu: initialState.menu
    }
    checkReducer(reducer, action, newState)
  })

  it('handles SET_COLOR', () => {
    const action = { type: types.SET_COLOR, payload: 'theMenu', color: 'theColor' }
    const newState = {
      ...initialState,
      theMenu: "theColor"
    }
    checkReducer(reducer, action, newState)
  })

  it('handles MENU_NEXT', () => {
    const action = { type: types.MENU_NEXT, payload: 'data' }
    const newState = {
      ...initialState,
      nextMenu: 'data'
    }
    checkReducer(reducer, action, newState)
  })
})

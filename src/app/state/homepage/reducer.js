import * as types from '../actionTypes'
import {colors}from "../../util/constants"

let initialState = {
    residentMenu: {
      text: 'Residents', url: '/residents',
      items: [
        { text: 'New Resident' },
        { text: 'Edit', url: '/residents/edit'},
        {
          text: 'Counsel Notes',
          items: [
            { text: 'new' }
          ]
        },
        {
          text: 'Schedule',
          items: [
            { text: 'Print' }
          ]
        },
        { text: 'Accountability' },
      ]
    },
    accountabilityMenu: {
      text: 'Accountability', url: '/accountability',
      items: [
        { text: 'Daily Entry' },
        { text: 'New Month' },
        {
          text: 'Reports',
          items: [
            { text: 'Monthly' },
            { text: '30 days' },
            { text: 'Year to date' }
          ]
        },
        { text: 'Daily Happenings' },
      ]
    },
    remindersMenu: {
      text: 'Reminders', url: '/reminders',
      items: [
        { text: 'New Reminder', url: '' }
      ]
    },
    announcementsMenu:{ text: 'Announcements' },
    scheduleMenu: { text: 'Scheduling' },
    dataManagerMenu: { text: 'Data Manager' },
    menu: {
        text: 'homepage', url: '/',
        items: []
      },
    selectedMenu: null,
    nextMenu: null,
    menuColor: colors.greenLight2,
    buttonColor: colors.white,
    tmpColor:  "#EAC87D",
    enablePicker: true
}
initialState.menu.items.push(initialState.residentMenu)
initialState.menu.items.push(initialState.accountabilityMenu)
initialState.menu.items.push(initialState.remindersMenu)
initialState.menu.items.push(initialState.announcementsMenu)
initialState.menu.items.push(initialState.scheduleMenu)
initialState.menu.items.push(initialState.dataManagerMenu)
initialState.selectedMenu = initialState.menu

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case types.MENU_SELECTED: {
        return {
          ...state,
          selectedMenu: action.payload,
          nextMenu: null
        }
      }
      case types.MENU_HOME: {
        return {
          ...state,          
          selectedMenu: initialState.menu
        }  
      }
      case types.SET_COLOR:{
        return {
          ...state,
          [action.payload] : action.color
        }
      }
      case types.MENU_NEXT: {
        return {
          ...state,
          nextMenu: action.payload
        }
      }

      default:
        return state
    }
  }
  

import {combineReducers} from "redux"

import login from "./login/reducer"
import homepage from "./homepage/reducer"
import residents from "./residents/reducer"
import accountability from "./accountability/reducer"

//TODO add auto-detect of files under this folder
export default combineReducers({
  login,
  homepage,
  residents,
  accountability
  })

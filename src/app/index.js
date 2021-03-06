import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import {applyMiddleware, createStore, compose} from 'redux'
import thunk from "redux-thunk"

import {getGlobalStore, setGlobalStore} from "./state/globalStore"
import App from "./App.js"
import reducer from "./state/combinedReducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
setGlobalStore(createStore(reducer,
	composeEnhancers(
		applyMiddleware(thunk))
	)
)

ReactDOM.render(
  <Provider store={getGlobalStore()}><App /></Provider>,
  document.getElementById("sers")
);

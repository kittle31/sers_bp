import axios from 'axios'
export function checkActionFn (actions, store, action, actionArgs,
  expectedActions,
  url, urlArg) {
   //console.log("actions", actions)
   //console.log("store", store)
  //  console.log("action", action)
  //  console.log("actionArgs", actionArgs)
  //  console.log("expectedActions", expectedActions)
  //  console.log("url", url)
  //  console.log("urlArg", urlArg)

    const fun = actions[action]
    expect( fun).toBeDefined()
    return store.dispatch(  fun.apply("ignored", actionArgs)).then( () => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(axios.post).toHaveBeenCalledWith(url, urlArg)
    })
  }

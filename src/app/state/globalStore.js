let store = null

export const setGlobalStore = (inStore) => {
  store = inStore
}

export const getGlobalStore = () => {
  return store
}

export const dispatch = () => {
  store.dispatch.apply(null, arguments)
}

export default store


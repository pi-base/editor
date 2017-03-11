import * as I from 'immutable'

import * as A from './actions'

const reducer = (state, action) => {
  state = state || I.Map({})

  switch (action.type) {
    case A.RUN_SEARCH:
      return state.merge({ search: action.q })
    case A.EDIT_FILE:
      return state.merge({
        route: 'edit',
        editor: {
          path: action.path,
          body: action.body
        }
      })
    default:
      return state
  }
}

export default reducer

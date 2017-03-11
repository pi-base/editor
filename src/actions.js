const electron = window.require('electron')
const ipc = electron.ipcRenderer

const uuidV4 = require('uuid/v4')

const remote = (method, ...args) => {
  const id = uuidV4()
  return new Promise((resolve, reject) => {
    ipc.once(id, (event, ...args) => {
      resolve(...args)
    })
    ipc.send(method, id, ...args)
  })
}

window.onerror = (err) => ipc.send('ERROR', err)
window.log = (...args) => {
  ipc.send('LOG', ...args)
  console.log(...args)
}

// Action types
export const RUN_SEARCH = 'RUN_SEARCH'
export const EDIT_FILE  = 'EDIT_FILE'

// Action creators
export const editFile = (dispatch, path) => {
  remote('LOAD_FILE', path).then(body => {
    dispatch({ type: EDIT_FILE, path: path, body: body })
  })
}

export const runSearch = (dispatch, q) => {
  if (q === '!') {
    editFile(dispatch, 'properties/metrizable.md')
  } else {
    dispatch({ type: RUN_SEARCH, q: q })
  }
}

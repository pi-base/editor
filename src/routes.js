import Editor from './components/Editor'
import Home from './components/Home'

export const renderPartial = (state) => {
  switch (state.get('route')) {
    case 'edit':
      return Editor
    default:
      return Home
  }
}

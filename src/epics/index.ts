import { combineEpics } from 'redux-observable'

// epics
import authEpic from './authEpic'

const epics = [
  ...authEpic,
]

export default combineEpics(...epics)

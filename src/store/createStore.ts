import Immutable from 'seamless-immutable'
import { thunk } from 'redux-thunk'
import { applyMiddleware, legacy_createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from '@redux-devtools/extension'
import { BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import createRootReducer from './reducers'
import rootEpic from '../epics'

// types
import type { Store as ReduxStore, Middleware } from 'redux'
import type { AsyncReducers } from '../store/reducers'

export interface Store extends ReduxStore { 
  asyncReducers: Partial<AsyncReducers>;
}

const createStore = (initialState = Immutable({})): Store => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const epicMiddleware = createEpicMiddleware()
  const middlewares = [
    thunk,
    epicMiddleware,
  ]

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store: Store = {
    ...legacy_createStore(
      createRootReducer(),
      initialState,
      composeWithDevTools(applyMiddleware(...middlewares as Middleware[]))
    ),
    asyncReducers: {},
  }

  const epic$ = new BehaviorSubject(rootEpic)
  const hotReloadingEpic = (action$, state$, dependencies) => (
    epic$.pipe(switchMap((epic) => epic(action$, state$, dependencies)))
  )
  epicMiddleware.run(hotReloadingEpic) // eslint-disable-line @typescript-eslint/no-unsafe-argument

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../epics', () => {
      const nextRootEpic = require('../epics').default
      epic$.next(nextRootEpic)
    })
  }

  return store
}

export default createStore

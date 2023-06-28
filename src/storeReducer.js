import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import {
  // rootReducer(): A reducer function that stores location updates from history
  routerReducer,
  // routerMiddleware(history): A middleware you can apply to your Redux store to capture dispatched actions created by the action creators.
  // It will redirect those actions to the provided history instance.
  routerMiddleware
} from 'react-router-redux'
import rootSaga from './saga/rootSaga'
import history from './history'
import { createStateSyncMiddleware, initStateWithPrevTab, withReduxStateSync } from 'redux-state-sync'
import { LOG_OUT } from './actions/c4/common/actionType'
import { resetDataMiddleware } from './middleware/resetDataMiddleware'

// Middleware
// Init new tabs with existing state:
// 1. <Create the state sync middleware with config
const config = {
  whitelist: [LOG_OUT]
}
const middlewares = [
  createStateSyncMiddleware(config),
]
// />
const rootReducer = combineReducers({reducer: reducer, routing: routerReducer})
const sagaMiddleware = createSagaMiddleware()
let store = createStore(
  // 2. Wrap your root reducer with withReduxStateSync
  withReduxStateSync(rootReducer),
  applyMiddleware(sagaMiddleware,
    resetDataMiddleware,
    routerMiddleware(history),
    ...middlewares
  )
)
initStateWithPrevTab(store)
sagaMiddleware.run(rootSaga)
export default store

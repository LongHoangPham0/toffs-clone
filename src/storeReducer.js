import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import rootSaga from './saga/rootSaga'
import history from './history'
import { createStateSyncMiddleware, initStateWithPrevTab, withReduxStateSync } from 'redux-state-sync'
import { LOG_OUT } from './actions/c4/common/actionType'
import { resetDataMiddleware } from './middleware/resetDataMiddleware'

// Middleware
const config = {
  whitelist: [LOG_OUT]
}

const middlewares = [createStateSyncMiddleware(config)]

const rootReducer = combineReducers({reducer: reducer, routing: routerReducer})
const sagaMiddleware = createSagaMiddleware()
let store = createStore(withReduxStateSync(rootReducer), applyMiddleware(sagaMiddleware, resetDataMiddleware, routerMiddleware(history), ...middlewares))
initStateWithPrevTab(store)
sagaMiddleware.run(rootSaga)
export default store

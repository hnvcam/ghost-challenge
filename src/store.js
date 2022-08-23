import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user'
import createSagaMiddleware from '@redux-saga/core'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(sagas)

export default store

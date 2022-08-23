import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import store from './store'
import './inter-web/inter.css'
import './styles.css'
import { Provider } from 'react-redux'

const root = createRoot(document.getElementById('react-root'))
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Suspense } from 'react'
import {
    BrowserRouter as Router,
    useRoutes,
    Switch,
} from 'react-router-dom'

import routes from '~react-pages'

const App = () => {
    let rt = routes
    return (
        <Suspense fallback={<p style={{ margin: "auto", width: "50%" }}>Loading...</p>}>
            {useRoutes(routes)}
        </Suspense>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

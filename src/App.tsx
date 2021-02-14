import React from "react"
import { Router, Route } from "react-router-dom"
import { HomeRoute, DashboardRoute } from "routes"
import { createBrowserHistory } from "history"

const customHistory = createBrowserHistory()

const App: React.FC = () => {
    return (
        <Router history={customHistory}>
            <Route path='/'>
                <HomeRoute />
            </Route>
            <Route path='/manage'>
                <DashboardRoute />
            </Route>
        </Router>
    )
}
export default App

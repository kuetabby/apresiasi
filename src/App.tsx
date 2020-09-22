import React from "react"
import {
    Router,
    Route
    // Switch
} from "react-router-dom"
import {
    HomeRoute,
    DashboardRoute
    // SupportRoute
} from "routes"
import { createBrowserHistory } from "history"

// import { NotFoundPage } from "pages/notfound"

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
            {/* <Route path='/support'>
                <SupportRoute />
            </Route>
            <Route path='*'>
                <NotFoundPage />
            </Route> */}
        </Router>
    )
}
export default App

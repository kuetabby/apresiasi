import React, { Fragment, Suspense, lazy } from "react"
import { Switch, Route } from "react-router-dom"

import { HeaderHomepage } from "components/design-system/header"
// import { NotFoundPage } from "pages/notfound"

const HomePage = lazy(() => import("pages/homepage"))
const LoginPage = lazy(() => import("pages/login"))
const ExplorePage = lazy(() => import("pages/explore"))
const ApresiasiPage = lazy(() => import("pages/apresiasi"))

export const HomeRoute: React.FC = () => {
    return (
        <Fragment>
            <HeaderHomepage />
            <Suspense fallback={"loading..."}>
                <Switch>
                    <Route path='/login' component={LoginPage} />
                    <Route path='/explore' component={ExplorePage} />
                    <Route exact path='/user/:id' component={ApresiasiPage} />
                    <Route exact path='/' component={HomePage} />
                </Switch>
            </Suspense>
        </Fragment>
    )
}

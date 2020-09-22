import * as React from "react"
import { Redirect, RouteProps, Route } from "react-router-dom"
import Cookie from "js-cookie"

interface Props extends RouteProps {
    component: React.FC
}

// eslint-disable-next-line react/prop-types
export const ProtectedRoute: React.FC<Props> = props => {
    const isAuthenticated = Cookie.get("token") ? true : false
    return isAuthenticated ? <Route {...props} /> : <Redirect to={{ pathname: "/login" }} />
}

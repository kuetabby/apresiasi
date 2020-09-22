import React, { Fragment, lazy, Suspense } from "react"
import { Switch } from "react-router-dom"
import { HeaderDashboard } from "components/design-system/header"

import { ProtectedRoute } from "./protected_route"

const CreatorPage = lazy(() => import("pages/dashboard/dashboard_creator"))
const BalancePage = lazy(() => import("pages/dashboard/dashboard_balance"))
const DashboardHomePage = lazy(() => import("pages/dashboard/dashboard_home"))
const SettingsPage = lazy(() => import("pages/dashboard/dashboard_settings"))
const PostPage = lazy(() => import("pages/dashboard/dashboard_post"))

export const DashboardRoute: React.FC = () => {
    return (
        <Fragment>
            <HeaderDashboard />
            <Suspense fallback={"loading..."}>
                <Switch>
                    <ProtectedRoute path='/manage/my-page' component={CreatorPage} />
                    {/* <ProtectedRoute path='/manage/balance/withdrawal' component={BalanceWithdrawPage} /> */}
                    {/* <ProtectedRoute path='/manage/balance/bank-details' component={BalanceEditPage} /> */}
                    <ProtectedRoute path='/manage/balance' component={BalancePage} />
                    {/* <ProtectedRoute path='/manage/tip-received' component={TipPage} /> */}
                    {/* <ProtectedRoute path='/manage/goal-history' component={GoalPage} /> */}
                    {/* <ProtectedRoute path='/manage/post/create' component={PostCreatePage} /> */}
                    {/* <ProtectedRoute path='/manage/post/edit' component={PostEditPage} /> */}
                    <ProtectedRoute path='/manage/post' component={PostPage} />
                    {/* <ProtectedRoute path='/manage/my-follower' component={FollowersPage} /> */}
                    <ProtectedRoute path='/manage/settings' component={SettingsPage} />
                    <ProtectedRoute path='/manage/dashboard' exact component={DashboardHomePage} />
                </Switch>
            </Suspense>
        </Fragment>
    )
}

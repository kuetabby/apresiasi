import React, { Fragment } from "react"
import { Switch, Route } from "react-router-dom"

import { HeaderSupport } from "components/design-system/header"
import { TipGivenPage } from "pages/supporter"

export const SupportRoute: React.FC = () => {
    return (
        <Fragment>
            <HeaderSupport />
            <Switch>
                <Route path='/support/tip-given' component={TipGivenPage} />
            </Switch>
        </Fragment>
    )
}

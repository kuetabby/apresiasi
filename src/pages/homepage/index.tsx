import React from "react"

import { Root } from "./styles"
import { BenefitComponent } from "./homepage_benefit"
import { DescribeComponent } from "./homepage_describe"
// import { StatusComponent } from "./homepage_status"
// import { WorksComponent } from "./homepage_works"
import { FooterComponent } from "components/design-system/footer"

const HomePage: React.FC = () => {
    return (
        <React.Fragment>
            <Root>
                <DescribeComponent />
                {/* <StatusComponent /> */}
                <BenefitComponent />
                {/* <WorksComponent /> */}
            </Root>
            <FooterComponent />
        </React.Fragment>
    )
}

export default HomePage

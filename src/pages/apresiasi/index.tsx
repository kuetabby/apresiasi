/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react"
import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"

import { BoxFlex } from "components/utils/flex"
import CreatorFeedsComponent from "./apresiasi_feeds"
import CreatorProfileComponent from "./apresiasi_profile"
// import { FooterComponent } from "components/design-system/footer"

import { Root } from "./styles"

const GET_CREATOR = gql`
    query GetUserById($id: String!) {
        getUserById(id: $id) {
            id
            name
            profile_img

            judul
            balance
            target_dana

            cover_img

            category
            description

            is_page_active
        }
    }
`

const ApresiasiPage: React.FC = () => {
    const { id } = useParams()

    const { loading, error, data } = useQuery(GET_CREATOR, {
        variables: {
            id
        }
    })

    return (
        <React.Fragment>
            <Root>
                <BoxFlex marginTop='1em'>
                    <CreatorProfileComponent data={data} onLoading={loading} onError={error} />
                    <CreatorFeedsComponent id={id} data={data} onLoading={loading} onError={error} />
                </BoxFlex>
            </Root>
            {/* <FooterComponent /> */}
        </React.Fragment>
    )
}

export default ApresiasiPage

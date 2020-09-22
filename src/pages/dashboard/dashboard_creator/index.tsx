/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react"
import { Box, Spinner } from "@chakra-ui/core"
import styled from "@emotion/styled"
import { gql, useQuery } from "@apollo/client"

import { mediaQueries } from "components/utils/variables"
import CreatorPostComponent from "./creator_post"
import CreatorProfileComponent from "./creator_profile"

import { Root, BoxWrapper } from "../styles"

const BoxFlex = styled(Box)`
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 1em;

    ${mediaQueries.mdMax} {
        justify-content: center;
    }
`

const BoxQuery = styled(Box)`
    width: 100%;
    height: 500px;
    text-align: center;
    margin-top: 1.5em;
`

const GET_PROFILE = gql`
    {
        getUser {
            username
            name
            profile_img

            judul
            description
            target_dana

            cover_img

            is_page_active

            balance

            category
        }
    }
`

const CreatorPage: React.FC = () => {
    const { loading, error, data } = useQuery(GET_PROFILE)

    return (
        <Root>
            <BoxWrapper as='div'>
                {error ? (
                    <BoxQuery>
                        <p>Something went wrong...</p>
                    </BoxQuery>
                ) : null}
                {loading ? (
                    <BoxQuery>
                        <Spinner marginTop='5rem' />
                    </BoxQuery>
                ) : data ? (
                    <BoxFlex d='flex'>
                        <CreatorProfileComponent data={data.getUser} />
                        <CreatorPostComponent data={data.getUser} />
                    </BoxFlex>
                ) : null}
            </BoxWrapper>
        </Root>
    )
}

export default CreatorPage

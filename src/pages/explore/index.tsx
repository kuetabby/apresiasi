import React from "react"
import { Avatar, Box, Spinner } from "@chakra-ui/core"
import styled from "@emotion/styled"
import { gql, useQuery } from "@apollo/client"

import {
    Root,
    AvatarWrapper,
    DiscoverWrapper,
    DiscoverText,
    Card,
    CardWrapper,
    CardContent,
    CardButton,
    UserWrapper,
    UserDescription
} from "./styles"

import { colors } from "components/utils/variables"
import { FooterComponent } from "components/design-system/footer"

const BoxWrapper = styled(Box)`
    padding: 20px 30px;
`

const BoxQuery = styled(Box)`
    width: 100%;
    height: 500px;
    text-align: center;
    margin-top: 1.5em;
`

const BoxImg = styled(Box)`
    height: 200px;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
`

const GET_CREATOR = gql`
    {
        getAllUser {
            id
            name
            profile_img
            cover_img
            description
            category
        }
    }
`

const ExplorePage: React.FC = () => {
    const { loading, error, data } = useQuery(GET_CREATOR)

    return (
        <React.Fragment>
            <Root>
                <BoxWrapper>
                    <DiscoverWrapper>
                        <Box>
                            <DiscoverText>Explore</DiscoverText>
                        </Box>
                    </DiscoverWrapper>
                    {error ? (
                        <BoxQuery>
                            <p>Something went wrong...</p>
                        </BoxQuery>
                    ) : null}

                    {loading ? (
                        <BoxQuery>
                            <Spinner />
                        </BoxQuery>
                    ) : (
                        <CardWrapper>
                            {data &&
                                data.getAllUser.map((item: any, i: number) => (
                                    <Card to={`/user/${item.id}`} key={i}>
                                        <BoxImg backgroundImage={`url(${item.cover_img})`} />
                                        <AvatarWrapper>
                                            <Avatar
                                                size='xl'
                                                name={item.name || "avatar"}
                                                src={item.profile_img || ""}
                                            />
                                            <UserWrapper>
                                                <UserDescription>{item.name || ""}</UserDescription>
                                            </UserWrapper>
                                        </AvatarWrapper>
                                        <CardContent>
                                            <CardButton background={colors.grey}>{item.category || ""}</CardButton>
                                            <Box>{item.description}</Box>
                                        </CardContent>
                                        <CardButton background={colors.white} color={colors.red}>
                                            Lihat Halaman
                                        </CardButton>
                                    </Card>
                                ))}
                        </CardWrapper>
                    )}
                </BoxWrapper>
            </Root>
            <FooterComponent />
        </React.Fragment>
    )
}

export default ExplorePage

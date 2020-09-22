/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react"
import { Box, Button, Heading, Spinner } from "@chakra-ui/core"
import { gql, useQuery } from "@apollo/client"
import { format } from "date-fns"
import styled from "@emotion/styled"

import { mediaQueries } from "components/utils/variables"
import {
    BoxItem4
    // BoxItem6,
    // BoxItem3
} from "components/utils/flex"
import { BoxCard, ImgCard, TextCard } from "../styles"

// import { FeedsComponent } from "./feeds"

const BoxFlex = styled(Box)`
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    ${mediaQueries.mdMax} {
        align-items: center;
        height: auto;
        margin: 10px auto;
    }
`

const BoxItem7 = styled(Box)`
    flex: 0 0 auto;
    max-width: 70%;
    flex-basis: 70%;
    padding: 0 0.5em;
    margin: 1em auto;

    ${mediaQueries.lgMax} {
        max-width: 100%;
        flex-basis: 100%;
        padding: 0;
        margin-top: 2em;
    }
`

// const ButtonMenu = styled(Button)`
//     border: none;
//     border-radius: 0.25em;
//     color: ${colors.white};
//     cursor: pointer;
//     font-size: 0.9em;

//     ${mediaQueries.mdMax} {
//         width: 100%;
//         margin: 5px auto;
//     }
// `

// const ButtonShare = styled(Button)`
//     background-color: ${colors.red};
//     border: none;
//     border-radius: 0.25em;
//     color: ${colors.white};
//     cursor: pointer;
//     font-size: 0.9em;

//     &:hover {
//         background-color: ${colors.green};
//     }
// `

const BoxQuery = styled(Box)`
    width: 100%;
    height: 100px;
    text-align: center;
    margin-top: 1.5em;
`

const BoxImage = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 250px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;

    ${mediaQueries.mdMax} {
        display: none;
    }
`

const ButtonCategory = styled(Button)`
    border: none;
    border-radius: 0.25em;
    margin-top: 1em;
    height: 30px;

    cursor: pointer;
`

const GET_POST = gql`
    query GetPostByIdParam($id: String!) {
        getPostByIdParam(id: $id) {
            id
            title
            announcement
            post_img
        }
    }
`

const GET_TRANSACTION = gql`
    query GetCurrentUserTransactionById($id: String!) {
        getCurrentUserTransactionById(id: $id) {
            payment_tanggal
            payment_amount
            customer_name
            pesan_dukungan
        }
    }
`

interface Props {
    id: string
    data: any
    onLoading: boolean
    onError: any
}

const ApresiasiFeedsComponent: React.FC<Props> = ({ id, data, onLoading, onError }) => {
    const { loading: post_loading, error: post_error, data: post_data } = useQuery(GET_POST, {
        variables: {
            id
        }
    })

    const { loading: transaction_loading, error: transaction_error, data: transaction_data } = useQuery(
        GET_TRANSACTION,
        {
            variables: {
                id
            }
        }
    )

    return (
        <BoxItem7 height='100vh'>
            {onError ? <p>Something went wrong...</p> : null}
            {onLoading ? (
                <BoxQuery>
                    <Spinner />
                </BoxQuery>
            ) : (
                <BoxImage backgroundImage={`url(${data && data.getUserById.cover_img})`} />
            )}
            <BoxFlex d='flex'>
                <BoxItem4>
                    <Heading as='h1' size='md'>
                        Activity Feeds
                    </Heading>
                    {/* <FeedsComponent /> */}
                </BoxItem4>
                <BoxItem4>
                    {onLoading ? (
                        <BoxQuery>
                            <Spinner />
                        </BoxQuery>
                    ) : (
                        <ButtonCategory>{data && data.getUserById.category}</ButtonCategory>
                    )}
                </BoxItem4>

                <BoxFlex d='flex' height='100vh'>
                    <BoxItem4>
                        <Heading as='h1' size='md'>
                            Posts
                        </Heading>
                        {post_error ? (
                            <BoxQuery>
                                <p>Something went wrong...</p>
                            </BoxQuery>
                        ) : null}
                        {post_loading ? (
                            <BoxQuery>
                                <Spinner />
                            </BoxQuery>
                        ) : post_data ? (
                            post_data &&
                            post_data.getPostByIdParam.map((item: any, i: number) => (
                                <BoxCard key={i}>
                                    <TextCard>
                                        <Box>{item.title}</Box>
                                    </TextCard>
                                    <ImgCard backgroundImage={`url(${item.post_img})`} />
                                    <TextCard>
                                        <Box as='div' height='100px'>
                                            {item.announcement}
                                        </Box>
                                    </TextCard>
                                </BoxCard>
                            ))
                        ) : null}
                    </BoxItem4>
                    <BoxItem4>
                        <Heading as='h1' size='md'>
                            Donatur
                        </Heading>
                        {transaction_error ? (
                            <BoxQuery>
                                <p>Something went wrong...</p>
                            </BoxQuery>
                        ) : null}
                        {transaction_loading ? (
                            <BoxQuery>
                                <Spinner />
                            </BoxQuery>
                        ) : transaction_data ? (
                            transaction_data &&
                            transaction_data.getCurrentUserTransactionById.map((item: any, i: number) => (
                                <BoxCard key={i}>
                                    <TextCard>
                                        <Box>
                                            Tanggal
                                            <p style={{ textAlign: "center" }}>
                                                {format(new Date(item.payment_tanggal), "dd-MM-yyyy")}
                                            </p>
                                        </Box>
                                        <Box>
                                            Nama <p style={{ textAlign: "center" }}>{item.customer_name}</p>
                                        </Box>
                                        <Box>
                                            Pesan
                                            <p style={{ textAlign: "center" }}>{item.pesan_dukungan}</p>
                                        </Box>
                                        <Box>
                                            Dana
                                            <p style={{ textAlign: "center" }}>
                                                Rp. {Number(item.payment_amount).toLocaleString()}
                                            </p>
                                        </Box>
                                    </TextCard>
                                </BoxCard>
                            ))
                        ) : null}
                    </BoxItem4>
                </BoxFlex>
            </BoxFlex>
        </BoxItem7>
    )
}

export default ApresiasiFeedsComponent

/* <Heading as='h1' size='md'>
                        About
                    </Heading> */

/* <p>Summary</Box> */

/* <p>Twitter</Box> */

/* <BoxItem4 height='100px'>
                        <ButtonMenu
                            backgroundColor={colors.green}
                            _hover={{
                                bg: "green.600"
                            }}
                            width='30%'
                            marginLeft='10px'
                            marginTop='1em'
                            float='right'
                        >
                            Share Page
                        </ButtonMenu>
                        <ButtonMenu
                            backgroundColor={colors.blue}
                            _hover={{
                                bg: "blue.300"
                            }}
                            width='30%'
                            marginLeft='10px'
                            marginTop='1em'
                            float='right'
                        >
                            Follow
                        </ButtonMenu>
                    </BoxItem4> */

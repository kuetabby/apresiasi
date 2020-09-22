/* eslint-disable @typescript-eslint/camelcase */
import React, { Fragment } from "react"
import { Box, Heading, Spinner } from "@chakra-ui/core"
import { gql, useQuery } from "@apollo/client"
import { format } from "date-fns"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from "recharts"
import styled from "@emotion/styled"

import { mediaQueries, colors } from "components/utils/variables"
import { Root, BoxWrapper } from "./styles"

const BoxSaldo = styled(Box)`
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
`

const BoxItem = styled(Box)`
    margin-top: 1.5em;
    margin-right: 1em;
    width: 30%;

    ${mediaQueries.smMax} {
        width: 100%;
    }
`

const BoxQuery = styled(Box)`
    width: 100%;
    height: 500px;
    text-align: center;
    margin-top: 1.5em;
`

const BoxCharts = styled(Box)`
    height: 300px;
    margin-top: 5em;
`

const GET_PROFILE = gql`
    {
        getUser {
            balance
        }
    }
`

const GET_TRANSACTION = gql`
    {
        getCurrentUserTransaction {
            id
            payment_tanggal
            payment_amount
        }
    }
`

interface Props {}

const DashboardHomePage: React.FC<Props> = () => {
    const { loading: loading_user, error: error_user, data: data_user } = useQuery(GET_PROFILE)
    const { loading: loading_transaction, error: error_transaction, data: data_transaction } = useQuery(GET_TRANSACTION)

    const data_array: { tanggal: string; amount: string }[] = []
    for (const key in data_transaction && data_transaction.getCurrentUserTransaction) {
        data_array.push({
            tanggal: format(new Date(data_transaction.getCurrentUserTransaction[key].payment_tanggal), "dd-MM-yyyy"),
            amount: data_transaction.getCurrentUserTransaction[key].payment_amount
        })
    }

    return (
        <Root>
            <BoxWrapper as='div'>
                {/* <Heading as='h1' size='md' color={colors.red}>
                    Dashboard
                </Heading> */}
                <BoxSaldo d='flex'>
                    {error_user ? <p>Something went wrong...</p> : null}
                    {loading_user ? (
                        <Spinner />
                    ) : data_user ? (
                        <Fragment>
                            <BoxItem as='div'>
                                <Heading as='h3' size='md' marginBottom='0' color={colors.red}>
                                    Rp. {(data_user && Number(data_user.getUser.balance).toLocaleString()) || 0}
                                </Heading>
                                <Box as='div' color={colors.blue}>
                                    <small>Jumlah Saldo Saat ini</small>
                                </Box>
                            </BoxItem>
                        </Fragment>
                    ) : null}
                    {/* <BoxItem as='div'>
                        <Heading as='h3' size='md' marginBottom='0' color={colors.red}>
                            Rp 0
                        </Heading>
                        <Box as='div' color={colors.blue}>
                            <small>Traktiran Bulan April</small>
                        </Box>
                    </BoxItem>
                    <BoxItem as='div'>
                        <Heading as='h3' size='md' marginBottom='0' color={colors.red}>
                            0
                        </Heading>
                        <Box as='div' color={colors.blue}>
                            <small>Kali Digift</small>
                        </Box>
                    </BoxItem> */}
                    {/* <BoxItem as='div'>
                        <Heading as='h3' size='md' marginBottom='0' color={colors.red}>
                            Rp 0
                        </Heading>
                        <Box as='div' color={colors.blue}>
                            <small>Jumlah Dicairkan</small>
                        </Box>
                    </BoxItem> */}
                    {/* <BoxItem as='div'>
                        <Heading as='h3' size='md' marginBottom='0' color={colors.red}>
                            0
                        </Heading>
                        <Box as='div' color={colors.blue}>
                            <small>Jumlah Supporter Aktif (30 hari terakhir)</small>
                        </Box>
                    </BoxItem> */}
                </BoxSaldo>
                <Box as='div' marginTop='5em' fontWeight='600' textAlign='center'>
                    Jumlah dukungan
                </Box>
                <BoxCharts as='div'>
                    {error_transaction ? <p>Something went wrong with chart...</p> : null}
                    {loading_transaction ? (
                        <BoxQuery>
                            <Spinner />
                        </BoxQuery>
                    ) : (
                        <ResponsiveContainer width='100%' height='100%'>
                            <LineChart data={data_array}>
                                <XAxis dataKey='tanggal' />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid stroke='#f5f5f5' />
                                <Line type='monotone' dataKey='amount' stroke='#ff7300' yAxisId={0} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </BoxCharts>
            </BoxWrapper>
        </Root>
    )
}

export default DashboardHomePage

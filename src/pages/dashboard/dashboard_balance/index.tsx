/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react"
import { Box, Heading, Spinner } from "@chakra-ui/core"
import styled from "@emotion/styled"
import { gql, useQuery } from "@apollo/client"

// import { colors, mediaQueries } from "components/utils/variables"
// import { TableBalance } from "components/design-system/table/table_balance"
import { Root, BoxWrapper } from "../styles"
import { BoxFlex, BoxItem2 } from "components/utils/flex"

import { TableTipReceived } from "components/design-system/table/table_tip_received"

// import { BalanceEdit } from "./balance_edit"
// import { BalanceWithdrawal } from "./balance_withdraw"

const BoxBalanceAvailable = BoxItem2
// const BoxBankDetail = BoxItem2

// const BoxBankEmpty = styled(Box)`
//     background: ${colors.yellow};
//     color: ${colors.brown};
//     padding: 10px;
//     border-radius: 0.25em;
//     margin-top: 0;
// `

// const BoxWithdraw = styled(Box)`
//     flex: 0 0 auto;
//     max-width: 45%;
//     flex-basis: 45%;
//     padding: 0 0.5em;

//     ${mediaQueries.smMax} {
//         max-width: 100%;
//         flex-basis: 100%;
//         padding: 0;
//         margin-top: 1em;
//     }
// `

const BoxQuery = styled(Box)`
    width: 100%;
    height: 500px;
    text-align: center;
    margin-top: 1.5em;
`

const GET_PROFILE = gql`
    {
        getUser {
            balance
        }
    }
`

const BalancePage: React.FC = () => {
    const { loading: loading_user, error: error_user, data: data_user } = useQuery(GET_PROFILE)

    return (
        <Root>
            <BoxWrapper as='div'>
                {/* <Heading as='h1' size='md' color={colors.red}>
                    My Balance
                </Heading> */}
                <BoxFlex marginTop='1.5em' justifyContent='space-between'>
                    <BoxBalanceAvailable>
                        <Heading as='h4' size='md' margin='0 auto'>
                            Available Balance
                        </Heading>
                        {error_user ? (
                            <BoxQuery>
                                <p>Something went wrong...</p>
                            </BoxQuery>
                        ) : null}
                        {loading_user ? (
                            <BoxQuery>
                                <Spinner />
                            </BoxQuery>
                        ) : data_user ? (
                            <Heading as='h3' size='sm'>
                                Rp. {(data_user && Number(data_user.getUser.balance).toLocaleString()) || 0}
                            </Heading>
                        ) : null}
                    </BoxBalanceAvailable>
                    {/* <BoxBankDetail>
                        <Heading as='h4' size='md' margin='0 auto'>
                            Bank Account
                        </Heading>
                        <BoxBankEmpty as='p'>Your bank details has not set up yet</BoxBankEmpty>
                        <BalanceEdit />
                    </BoxBankDetail> */}
                    {/* <BoxWithdraw>
                        <BalanceWithdrawal />
                    </BoxWithdraw> */}
                </BoxFlex>
                <TableTipReceived />
            </BoxWrapper>
        </Root>
    )
}

export default BalancePage

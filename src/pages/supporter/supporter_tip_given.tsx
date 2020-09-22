/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react"
import {
    Heading
    // Button
} from "@chakra-ui/core"
// import styled from "@emotion/styled"

import { Root, BoxWrapper } from "./styles"
import {
    colors
    // mediaQueries
} from "components/utils/variables"
import { TableTipGiven } from "components/design-system/table/table_tip_given"

// const ButtonTip = styled(Button)`
//     border-radius: 0.25em;
//     cursor: pointer;
//     padding: 2px 7px;
//     background-color: ${colors.red};
//     color: white;
//     border: none;
//     width: 15%;
//     margin: 0 10px;

//     &:hover,
//     :focus {
//         background-color: ${colors.darkRed};
//     }

//     ${mediaQueries.mdMax} {
//         width: 100%;
//         margin: 10px 0;
//     }
// `

export const TipGivenPage: React.FC = () => {
    return (
        <Root>
            <BoxWrapper as='div'>
                <Heading as='h1' size='md' color={colors.red}>
                    Dukungan Diberikan
                </Heading>
                {/* <ButtonTip>Sebagai Member</ButtonTip>
                <ButtonTip>Sebagai Guest</ButtonTip> */}
                <TableTipGiven />
            </BoxWrapper>
        </Root>
    )
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react"
import { Heading } from "@chakra-ui/core"

import { Root, BoxWrapper } from "./styles"
import { colors } from "components/utils/variables"
import { TableTipReceived } from "components/design-system/table/table_tip_received"

export const TipPage: React.FC = () => {
    return (
        <Root>
            <BoxWrapper as='div'>
                <Heading as='h1' size='md' color={colors.red}>
                    Dukungan Diterima
                </Heading>
                <Heading as='h4' size='md' margin='0 auto'>
                    Total Dukungan Diterima : Rp 0
                </Heading>
                <TableTipReceived />
            </BoxWrapper>
        </Root>
    )
}

import * as React from "react"
import { Heading } from "@chakra-ui/core"

import { colors } from "components/utils/variables"
import { Root, BoxWrapper } from "./styles"
import { TableComponent } from "components/design-system/table"

export const GoalPage: React.FC = () => {
    return (
        <Root>
            <BoxWrapper as='div'>
                <Heading as='h1' size='md' color={colors.red}>
                    Riwayat Pencapaian Target
                </Heading>
                <TableComponent />
            </BoxWrapper>
        </Root>
    )
}

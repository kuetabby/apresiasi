import * as React from "react"
import { Heading } from "@chakra-ui/core"

import { colors } from "components/utils/variables"
import { Root, BoxWrapper } from "./styles"
import { TableComponent } from "components/design-system/table"

// const BoxFlex = styled(Box)`
//     flex-wrap: wrap;
//     flex: 0 1 auto;
//     width: 100%;
//     margin-top: 1.5em;
// `

export const FollowingPage: React.FC = () => {
    return (
        <Root>
            <BoxWrapper as='div'>
                <Heading as='h1' size='md' color={colors.red}>
                    Following
                </Heading>
                <TableComponent />
            </BoxWrapper>
        </Root>
    )
}

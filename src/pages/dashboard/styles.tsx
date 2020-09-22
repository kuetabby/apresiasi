import styled from "@emotion/styled"
import { Box } from "@chakra-ui/core"
import { mediaQueries } from "components/utils/variables"

export const Root = styled(Box)`
    width: 100%;
    height: 100%;
    margin-top: 5em;
`
export const BoxWrapper = styled(Box)`
    margin-top: 2em;
    margin: 0 3.2em;

    ${mediaQueries.smMax} {
        margin: 0 1em;
    }
`

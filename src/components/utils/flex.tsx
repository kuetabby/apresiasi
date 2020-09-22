import styled from "@emotion/styled"
import { Box } from "@chakra-ui/core"
import { mediaQueries } from "./variables"

export const BoxFlex = styled(Box)`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex: 0 1 auto;
    width: 100%;
`
export const BoxItem2 = styled(Box)`
    flex: 0 0 auto;
    max-width: 25%;
    flex-basis: 25%;
    padding: 0 0.5em;
    height: 100%;

    ${mediaQueries.lgMax} {
        max-width: 100%;
        flex-basis: 100%;
        padding: 0;
    }
`

export const BoxItem3 = styled(Box)`
    flex: 0 0 auto;
    max-width: 30%;
    flex-basis: 30%;
    padding: 0 0.5em;

    ${mediaQueries.lgMax} {
        max-width: 100%;
        flex-basis: 100%;
        padding: 0;
    }
`

export const BoxItem4 = styled(Box)`
    flex: 0 0 auto;
    max-width: 45%;
    flex-basis: 45%;
    padding: 0 0.5em;

    ${mediaQueries.mdMax} {
        max-width: 100%;
        flex-basis: 100%;
        margin-top: 10px;
        padding: 0;
    }
`

export const BoxItem6 = styled(Box)`
    flex: 0 0 auto;
    max-width: 60%;
    flex-basis: 60%;
    padding: 0 0.5em;

    ${mediaQueries.lgMax} {
        max-width: 100%;
        flex-basis: 100%;
        padding: 0;
    }
`

export const BoxItem7 = styled(Box)`
    flex: 0 0 auto;
    max-width: 70%;
    flex-basis: 70%;
    padding: 0 0.5em;

    ${mediaQueries.lgMax} {
        max-width: 100%;
        flex-basis: 100%;
        padding: 0;
    }
`

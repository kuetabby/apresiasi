import styled from "@emotion/styled"
import { Box, Button } from "@chakra-ui/core"

import { mediaQueries } from "components/utils/variables"

export const Content = styled(Box)`
    padding: 20px;
    display: flex;
    flex: 0 1 auto;
    justify-content: center;
    align-items: center;
`

export const Card = styled(Box)`
    border: 1px solid grey;
    border-radius: 0.5em;
    width: 33%;
    height: 460px;
    text-align: center;
    margin: 5em 0;

    ${mediaQueries.lgMax} {
        width: 100%;
        border: none;
    }
`

export const SubHeading = styled(Box)`
    font-size: 1em;
    margin-bottom: 20px;
`

export const Row = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 80%;
`

export const Divider = styled.span`
    display: flex;
    text-align: center;
    align-items: center;
    font-size: 1em;
    margin: 20px 0;

    &:before {
        content: "";
        flex: 1 1;
        margin: auto;
        border-bottom: 1px solid black;
    }
    &:after {
        content: "";
        flex: 1 1;
        margin: auto;
        border-bottom: 1px solid black;
    }
`
interface ButtonLoginProps {
    background?: string
}

export const ButtonLogin = styled(Button)<ButtonLoginProps>`
    border: 1px solid;
    border-radius: 20px;
    color: white;
    font-size: 1em;
    background-color: ${props => props.background}
    margin-left: 10px;
    width: 100%;
    height: 35px;

    cursor: pointer;
`

export const Icon = styled.span`
    margin: auto 5px;
`

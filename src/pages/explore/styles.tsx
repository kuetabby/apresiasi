import styled from "@emotion/styled"
import { Button, Box } from "@chakra-ui/core"

import { mediaQueries, shadows, colors } from "components/utils/variables"
import { NavLink } from "react-router-dom"

export const Root = styled(Box)`
    max-width: 1440px;
    margin: 0 auto;
    padding-top: 50px;
`

export const DiscoverWrapper = styled(Box)`
    margin: 2em auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${mediaQueries.mdMax} {
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-start;
    }
`

export const DiscoverText = styled(Box)`
    margin-bottom: 5px;
    font-size: 2em;
    font-weight: 600;
`
export const DiscoverSubText = styled(Box)`
    margin-bottom: 20px;
    font-size: 1.25em;
    font-weight: 600;
`

export const AvatarWrapper = styled(Box)`
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    margin-bottom: 3em;
`

export const UserWrapper = styled(Box)`
    width: 100%;
    text-align: left;
    margin: 10px;
`

export const UserDescription = styled(Box)`
    overflow: hidden;
    color: black;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 600;
`

export const CardWrapper = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    text-align: center;

    justify-content: space-between;
`

export const Card = styled(NavLink)`
    box-sizing: border-box;
    box-shadow: ${shadows.single};
    flex-basis: 100%;
    max-width: 100%;
    margin: 10px 0;
    text-decoration: none !important;

    ${mediaQueries.md} {
        flex-basis: 45%;
        max-width: 45%;
        margin: 5px;
    }

    ${mediaQueries.lg} {
        flex-basis: 30%;
        max-width: 30%;
        margin: 5px;
    }

    &:hover {
        button:nth-child(1) {
            background: ${colors.grey};
            color: ${colors.black};
        }

        button:nth-child(4) {
            background: ${colors.red};
            color: ${colors.white};
        }
    }
`

export const CardContent = styled(Box)`
    padding: 10px 40px;
    text-align: left;
    font-size: 1em;
`

interface CardButtonProps {
    borderColor?: string
    backgroundColor?: string
}

export const CardButton = styled(Button)<CardButtonProps>`
    border: none;
    border-radius: 0.25em;
    font-family: kingthings;
    margin: 10px auto;
    max-width: 100%;
    box-shadow: ${shadows.single};
    cursor: pointer;
`

export const ButtonSearch = styled(Button)`
    border: 1px solid lightblue;
    border-radius: 30px;
    color: white;
    font-size: 1em;
    margin-left: 10px;

    cursor: pointer;
`

import React from "react"
import { Box } from "@chakra-ui/core"
import styled from "@emotion/styled"
import { mediaQueries, colors } from "components/utils/variables"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@chakra-ui/core"
import { NavLink } from "react-router-dom"
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const Root = styled(Box)`
    max-width: 1440px;
    margin: 0 auto;
    padding-top: 50px;
`
export const Row = styled(Box)`
    display: flex;
    flex: 0 1 auto;
    flex-wrap: wrap;
    justify-content: space-between;
`
export const WrapperDescribe = styled(Box)`
    text-align: center;
    ${mediaQueries.lg} {
        min-height: 600px;
    }
`

export const WrapperStatus = styled(Box)`
    background-color: ${colors.pink};
    color: ${colors.red};
    text-align: center;
    padding: 0;
    // margin-bottom: 1em;

    ${mediaQueries.md} {
        padding: 70px 150px;
    }
`

export const WrapperCreatePage = styled(Box)`
    text-align: center;
    padding: 70px 40px;
    ${mediaQueries.md} {
        padding: 120px 80px;
    }
`

export const WrapperCreator = styled(Box)`
    text-align: center;
    background: white;
    padding: 70px 40px;

    ${mediaQueries.md} {
        padding: 120px 80px;
    }
`

export const WrapperBenefit = styled(Box)`
    padding: 100px 40px;
    text-align: center;
    background: ${colors.grey};
    ${mediaQueries.md} {
        padding: 100px;
    }
`

export const WrapperWorks = styled(Box)`
    padding: 100px 40px;
    text-align: center;
    ${mediaQueries.md} {
        padding: 100px 150px;
    }
`

export const WrapperPromote = styled(Box)`
    text-align: center;
    padding: 70px 40px;
    background: pink;

    ${mediaQueries.md} {
        padding: 125px 80px;
    }
`

export const BenefitIcons = styled(FontAwesomeIcon)`
    font-size: 30px;
    color: blue;
`

const ActionLink = styled(NavLink)`
    text-decoration: none;
    margin-right: 20px;
    margin: 20px 0px;
`

const ActionButton = styled(Button)`
    border: none;
    border-radius: 0.25em;
    color: white;
    font-size: 1.25em;
    text-align: center;
    padding: 5px 40px;

    cursor: pointer;
    ${mediaQueries.lgMax} {
        width: 100%;
        max-width: 100%;
    }
`

interface ButtonLinkProps {
    to: string
    variantColor?: string
    backgroundColor?: string
    children?: React.ReactNode
}

export const ButtonLink: React.FC<ButtonLinkProps> = props => {
    return (
        <ActionLink to={props.to}>
            <ActionButton {...props}>{props.children}</ActionButton>
        </ActionLink>
    )
}

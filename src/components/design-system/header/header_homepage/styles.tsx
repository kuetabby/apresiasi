/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react"
import { NavLink } from "react-router-dom"
import styled from "@emotion/styled"
import { Button } from "@chakra-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { mediaQueries, colors } from "components/utils/variables"
import { HeaderProps } from "types/header"

export const HeaderMain = styled.header<HeaderProps>`
    position: fixed;
    top: 0;
    width: 100%;
    height: ${(props): string => (props.open ? "100%;" : "auto;")}
    z-index: 3;
    background-color: ${(props): string => (props.open ? "#0096ff;" : `${colors.red};`)}
    color: white;
    `

interface NavMainProps {
    width?: string
}

export const NavMain = styled.nav<NavMainProps>`
    display: flex;
    margin: 0 auto;
    max-width: ${props => (props.width ? props.width : "1440px")};
    z-index: 2;
    align-items: center;
    height: 60px;
    justify-content: space-between;
    position: relative;
`

export const NavList = styled.div<HeaderProps>`
    border-bottom: 0px;
    padding-bottom: 0px;
    dispay: flex;
    flex-wrap: wrap;

    ${(props): string | null =>
        props.open
            ? `{
        position: absolute;
        width: 100%;
        height: 100%;
    }`
            : null}

    ${mediaQueries.md} {
        text-align: center;
        align-items: center;
        margin-right: 50px;
    }
`

export const NavItemList = styled.div<HeaderProps>`
    ${(props): string | null =>
        props.open
            ? ` {
        justify-content: space-between;
        display: flex;
        flex-direction: column;
        margin-top: 3em;
        width: 100%;
        height: 100%;
    }`
            : null}
`

const NavP = styled.div<HeaderProps>`
    margin-right: 15px;
    font-weight: 700;
    font-size: 1.2em;
    display: inline-flex;

    ${mediaQueries.smMax} {
        display: ${(props): string => (props.hide ? "none" : "inline-flex")};
    }

    ${(props): string | null =>
        props.open
            ? `{
        display: block;
        box-sizing: border-box;
        text-align: center;
        margin-top: 2em;
    }`
            : null}
`

export const NavItem = (props: any) => (
    <NavP {...props}>
        <NavLink style={{ textDecoration: "none", color: props.open ? "black" : "white" }} to={props.to}>
            {props.children}
        </NavLink>{" "}
    </NavP>
)

export const NavCreator = styled(Button)`
    margin-left: 10px;
    padding: 8px 20px;
    background: ${colors.green};
    border: none;
    border-radius: 4px;
    border-color: purple;
    outline: none;
    font-weight: 700;
    font-size: 1.2em;

    cursor: pointer;
`

export const SearchButton = styled(Button)`
    border: 1px solid;
    border-color: ${colors.green};
    color: white;
    background: #38c516;
    cursor: pointer;

    &:hover {
        background: green;
    }
`

interface IconProps {
    readonly open?: boolean
}

export const HamburgerIcon = styled(FontAwesomeIcon)<IconProps>`
    color: white;
    font-size: 2em;
    display: none;

    ${mediaQueries.smMax} {
        margin-right: 5px;
        display: inline-flex;
        align-items: center;

        ${(props): string =>
            props.open
                ? `display:none`
                : `animation-name: lightSpeedIn;
        animation-duration: 0.5s;
        @keyframes lightSpeedIn {
            from {
                -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);
                transform: translate3d(100%, 0, 0) skewX(-30deg);
                opacity: 0;
            }

            60% {
                -webkit-transform: skewX(20deg);
                transform: skewX(20deg);
                opacity: 1;
            }

            80% {
                -webkit-transform: skewX(-5deg);
                transform: skewX(-5deg);
            }

            to {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
        }
        `}
    }
`

export const CloseIcon = styled(FontAwesomeIcon)<IconProps>`
    color: red;
    font-size: 2em;
    display: none;

    ${(props): string | null =>
        props.open
            ? `{
        display: inline-flex;
        float: right;
        margin-right: 5px;

        animation-name: flipInX;
        animation-duration: 0.5s;
          
          @keyframes flipInX {
            from {
              -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
              transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
              -webkit-animation-timing-function: ease-in;
              animation-timing-function: ease-in;
              opacity: 0;
            }
          
            40% {
              -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
              transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
              -webkit-animation-timing-function: ease-in;
              animation-timing-function: ease-in;
            }
          
            60% {
              -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
              transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
              opacity: 1;
            }
          
            80% {
              -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
              transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
            }
          
            to {
              -webkit-transform: perspective(400px);
              transform: perspective(400px);
            }
          }
    }`
            : null}
`

export const NavIcon = styled(FontAwesomeIcon)<IconProps>`
    font-size: 15px;
    margin-right: 10px;
    padding: 5px;
    background: white;
    color: ${colors.red};
    border-radius: 50%;
    cursor: pointer;
    display: ${(props): string => (props.open ? "none;" : "initial;")};
`

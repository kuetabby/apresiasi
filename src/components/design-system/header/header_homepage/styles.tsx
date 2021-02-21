/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from "@emotion/styled"
import { Button } from "@chakra-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { mediaQueries, colors } from "components/utils/variables"

export const NavItemCSS = `
    margin-right: 15px;
    font-weight: 700;
    font-size: 1.2em;
    display: inline-flex;
`

export const NavList = styled.div`
    border-bottom: 0px;
    padding-bottom: 0px;
    dispay: flex;
    flex-wrap: wrap;

    ${mediaQueries.md} {
        text-align: center;
        align-items: center;
        margin-right: 50px;
    }
`

export const NavSmallList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #0096ff;

    position: fixed;
    top: 0;
    z-index: 3;
    color: white;
`

export const NavButton = styled(Button)`
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

export const HamburgerIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 2em;
    display: none;

    ${mediaQueries.smMax} {
        margin-right: 5px;
        display: inline-flex;
        align-items: center;
        display: block;
    }
`

export const SpeedInAnimation = `
    animation-name: lightSpeedIn;
    animation-duration: 0.3s;
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
`

export const FlipInAnimation = `
    animation-name: flipInX;
    animation-duration: 0.3s;

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
`

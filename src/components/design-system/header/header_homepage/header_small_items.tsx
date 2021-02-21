import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import styled from "@emotion/styled"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cookie from "js-cookie"

import { FlipInAnimation, NavItemCSS, NavSmallList, NavButton } from "./styles"

const NavBody = styled.div`
    ${NavItemCSS}
    margin: 2rem 0;
`

const CloseIcon = styled(FontAwesomeIcon)`
    color: red;
    font-size: 2em;
    display: inline-flex;
    float: right;
    margin-right: 10px;
    position: absolute;
    right: 0;
    top: 0;

    ${FlipInAnimation}
`

interface Props {
    onClose: () => void
}

export const HeaderSmall: React.FC<Props> = ({ onClose }) => {
    const [width, setWidth] = useState(window.innerWidth)
    const token = Cookie.get("token")

    useEffect(() => {
        const handleResize = (): void => {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return (): void => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (width > 700) {
            onClose()
        }
    }, [onClose, width])

    return (
        <NavSmallList>
            <CloseIcon icon={faTimes} onClick={onClose} />
            <NavItem to='/' onClick={onClose}>
                Home
            </NavItem>
            <NavItem to='/explore' onClick={onClose}>
                Explore
            </NavItem>
            {token ? (
                <NavItem to='/manage/dashboard' onClick={onClose}>
                    <NavButton variantColor='green'>Dashboard</NavButton>
                </NavItem>
            ) : (
                <NavItem to='/login' onClick={onClose}>
                    <NavButton variantColor='green'>Login</NavButton>
                </NavItem>
            )}
        </NavSmallList>
    )
}

const NavItem = (props: { to: string; children?: React.ReactNode; onClick: () => void }) => (
    <NavBody onClick={props.onClick}>
        <NavLink style={{ textDecoration: "none", color: "white" }} to={props.to}>
            {props.children}
        </NavLink>
    </NavBody>
)

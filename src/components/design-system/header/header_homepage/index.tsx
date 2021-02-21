import React, { Suspense, lazy } from "react"
import { useDisclosure, Heading, Spinner } from "@chakra-ui/core"
import { NavLink } from "react-router-dom"
import styled from "@emotion/styled"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cookie from "js-cookie"

import { SpeedInAnimation, NavItemCSS, NavList, NavButton } from "./styles"
import { NavMain } from "../styles"
import { colors, mediaQueries } from "components/utils/variables"

const HeaderSmallItems = lazy(() =>
    import("./header_small_items").then(({ HeaderSmall }) => ({ default: HeaderSmall }))
)

const HeaderMain = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: auto;
    z-index: 3;
    background-color: ${colors.red};
    color: white;
`

const NavHeader = styled.div`
    ${NavItemCSS}
`

const NavBody = styled.div`
    ${NavItemCSS}
    ${mediaQueries.smMax} {
        display: none;
    }
`

const HamburgerIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 2em;
    display: none;

    ${mediaQueries.smMax} {
        margin-right: 5px;
        display: inline-flex;
        align-items: center;
        display: block;
        ${SpeedInAnimation}
    }
`

export const HeaderHomepage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const token = Cookie.get("token")

    if (isOpen) {
        return (
            <Suspense
                fallback={
                    <div style={{ textAlign: "center", margin: "1rem" }}>
                        <Spinner />
                    </div>
                }
            >
                <HeaderSmallItems onClose={onClose} />
            </Suspense>
        )
    }

    return (
        <HeaderMain>
            <NavMain>
                <NavHeader>
                    <NavLink style={{ textDecoration: "none", color: "white" }} to='/'>
                        <Heading as='h2' size='xl' marginLeft='5px'>
                            Apresiasi
                        </Heading>
                    </NavLink>
                </NavHeader>
                <NavList>
                    <NavItem to='/'>
                        <p>Home</p>
                    </NavItem>
                    <NavItem to='/explore'>Explore</NavItem>
                    {token ? (
                        <NavItem to='/manage/dashboard'>
                            <NavButton variantColor='green'>Dashboard</NavButton>
                        </NavItem>
                    ) : (
                        <NavItem to='/login'>
                            <NavButton variantColor='green'>Login</NavButton>
                        </NavItem>
                    )}
                    {!isOpen && <HamburgerIcon onClick={onOpen} icon={faBars} />}
                </NavList>
            </NavMain>
        </HeaderMain>
    )
}

const NavItem = (props: { to: string; children?: React.ReactNode }) => (
    <NavBody>
        <NavLink style={{ textDecoration: "none", color: "white" }} to={props.to}>
            {props.children}
        </NavLink>
    </NavBody>
)

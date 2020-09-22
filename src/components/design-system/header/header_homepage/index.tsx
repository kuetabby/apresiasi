import React, { useEffect, useState } from "react"
// import { NavLink } from "react-router-dom"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useDisclosure, Heading } from "@chakra-ui/core"
import Cookie from "js-cookie"

import { HeaderMain, HamburgerIcon, CloseIcon, NavItem, NavItemList, NavList, NavCreator } from "./styles"
import { NavMain } from "../styles"
// import { SearchNav } from "./header_search"
// import { HistoryNav } from "./header_history"

export const HeaderHomepage: React.FC = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const token = Cookie.get("token")

    useEffect(() => {
        const handleResize = (): void => {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return (): void => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (width < 700) {
            onClose()
        }
    }, [onClose, width])

    return (
        <HeaderMain open={isOpen}>
            <NavMain>
                {isOpen ? null : (
                    <NavItem to='/'>
                        <Heading as='h2' size='xl'>
                            Apresiasi
                        </Heading>
                    </NavItem>
                )}
                <NavList open={isOpen}>
                    <CloseIcon icon={faTimes} onClick={onClose} open={isOpen} />
                    <NavItemList open={isOpen}>
                        {/* <SearchNav openBar={isOpen} /> */}
                        {/* <HistoryNav openBar={isOpen} /> */}
                        {isOpen ? (
                            <NavItem to='/' open={isOpen} onClick={onClose} hide={true}>
                                Home
                            </NavItem>
                        ) : null}
                        <NavItem to='/explore' open={isOpen} onClick={onClose} hide={true}>
                            Explore
                        </NavItem>
                        {/* <NavItem to='/guide' open={isOpen} onClick={onClose} hide={true}>
                            Guide
                        </NavItem> */}
                        {token ? (
                            <NavItem to='/manage/dashboard' open={isOpen} onClick={onClose} hide={true}>
                                <NavCreator variantColor='green'>Dashboard</NavCreator>
                            </NavItem>
                        ) : (
                            <NavItem to='/login' open={isOpen} onClick={onClose} hide={true}>
                                <NavCreator variantColor='green'>Login</NavCreator>
                            </NavItem>
                        )}
                        <HamburgerIcon onClick={onOpen} open={isOpen} icon={faBars} />
                    </NavItemList>
                </NavList>
            </NavMain>
        </HeaderMain>
    )
}

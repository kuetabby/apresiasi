import * as React from "react"
import { NavLink } from "react-router-dom"
import styled from "@emotion/styled"
import { Box, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from "@chakra-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBars,
    faUser,
    // faUserPlus,
    faArrowUp
} from "@fortawesome/free-solid-svg-icons"

import { colors } from "components/utils/variables"
import { BoxIcon } from "./styles"

interface Props {}

const BoxLink = styled(NavLink)`
    text-decoration: none;
`

interface BoxItemProps {
    backgroundColor?: string
    hoverBackgroundColor?: string
}

const BoxItem = styled(Box)<BoxItemProps>`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 0.25em;
    color: white;
    font-size: 1em;
    padding: 10px 0;
    width: 100%;
    height: 30px;
    background-color: ${(props): string => (props.backgroundColor ? `${props.backgroundColor}` : `${colors.red}`)};

    cursor: pointer;

    &:hover {
        background-color: ${(props): string =>
            props.hoverBackgroundColor ? `${props.hoverBackgroundColor}` : `${colors.darkRed}`};
    }
`

const BoxFooter = styled(Box)<BoxItemProps>`
    text-align: center;
    border: none;
    border-radius: 0.25em;
    color: white;
    font-size: 1em;
    padding: 10px 0;
    width: 100%;
    height: 30px;
    background-color: ${(props): string => (props.backgroundColor ? `${props.backgroundColor}` : `${colors.red}`)};

    cursor: pointer;

    &:hover {
        background-color: ${(props): string =>
            props.hoverBackgroundColor ? `${props.hoverBackgroundColor}` : `${colors.darkRed}`};
    }
`

const Icons = styled(FontAwesomeIcon)`
    font-size: 15px;
    float: left;
`

export const DrawerNav: React.FC<Props> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <React.Fragment>
            <BoxIcon as='div' margin='0 15px'>
                <FontAwesomeIcon onClick={onOpen} icon={faBars} />
            </BoxIcon>
            <Drawer placement='left' onClose={onClose} isFullHeight={true} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent backgroundColor={colors.red} color={colors.white} overflowY='auto'>
                    <DrawerHeader borderBottomWidth='1px'>Apresiasi</DrawerHeader>
                    <DrawerBody textAlign='left'>
                        {/* <BoxLink to='/support/following'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faUserPlus} />
                                </Box>
                                <Box as='span'>Following</Box>
                            </BoxItem>
                        </BoxLink> */}
                        <BoxLink to='/support/tip-given'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faArrowUp} />
                                </Box>
                                <Box as='span'>Tip Given</Box>
                            </BoxItem>
                        </BoxLink>
                        <BoxLink to='/manage/settings'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faUser} />
                                </Box>
                                <Box as='span'>Account Settings</Box>
                            </BoxItem>
                        </BoxLink>
                        <BoxLink to='/manage/dashboard'>
                            <BoxFooter
                                as='div'
                                marginTop='3em'
                                hoverBackgroundColor={colors.darkGreen}
                                backgroundColor={colors.green}
                            >
                                <Box as='span'>Menu Creator</Box>
                            </BoxFooter>
                        </BoxLink>
                        <BoxLink to='/login'>
                            <BoxFooter
                                as='div'
                                marginTop='1em'
                                hoverBackgroundColor={colors.yellow}
                                backgroundColor='orange'
                            >
                                <Box as='span'>Logout</Box>
                            </BoxFooter>
                        </BoxLink>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    )
}

import * as React from "react"
import { NavLink } from "react-router-dom"
import Cookie from "js-cookie"

import styled from "@emotion/styled"
import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from "@chakra-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartBar, faGlobe, faWallet, faFile, faUser } from "@fortawesome/free-solid-svg-icons"

import { colors } from "components/utils/variables"

interface BoxItemProps {
    backgroundColor?: string
    hoverBackgroundColor?: string
}

const BoxLink = styled(NavLink)`
    text-decoration: none;
`

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

interface Props {
    onClose: () => void
    isOpen: boolean
}

export const DrawerItems: React.FC<Props> = ({ onClose, isOpen }) => {
    return (
        <React.Fragment>
            <Drawer placement='left' onClose={onClose} isFullHeight={true} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent backgroundColor={colors.red} color={colors.white} overflowY='auto'>
                    <DrawerHeader borderBottomWidth='1px'>Apresiasi</DrawerHeader>
                    <DrawerBody textAlign='left'>
                        <BoxLink to='/manage/dashboard'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faChartBar} />
                                </Box>
                                <Box as='span'>Dashboard</Box>
                            </BoxItem>
                        </BoxLink>
                        <BoxLink to='/manage/my-page'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faGlobe} />
                                </Box>
                                <Box as='span'>My Page</Box>
                            </BoxItem>
                        </BoxLink>
                        <BoxLink to='/manage/balance'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faWallet} />
                                </Box>
                                <Box as='span'>My Balance</Box>
                            </BoxItem>
                        </BoxLink>
                        <BoxLink to='/manage/post'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faFile} />
                                </Box>
                                <Box as='span'>Posts</Box>
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
                        <BoxLink to='/login' onClick={() => Cookie.remove("token")}>
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

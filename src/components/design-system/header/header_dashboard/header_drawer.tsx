import * as React from "react"
import { NavLink } from "react-router-dom"
import styled from "@emotion/styled"
import { Box, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from "@chakra-ui/core"
import Cookie from "js-cookie"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBars,
    faChartBar,
    faGlobe,
    faWallet,
    // faUsers,
    // faArrowDown,
    // faBullseye,
    faFile,
    faUser
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
                        {/* <BoxLink to='/manage/my-supporter'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faUsers} />
                                </Box>
                                <Box as='span'>My Supporter</Box>
                            </BoxItem>
                        </BoxLink>
                        <BoxLink to='/manage/tip-received'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faArrowDown} />
                                </Box>
                                <Box as='span'>Tip Received</Box>
                            </BoxItem>
                        </BoxLink>
                        <BoxLink to='/manage/goal-history'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faBullseye} />
                                </Box>
                                <Box as='span'>Goal History</Box>
                            </BoxItem> 
                        </BoxLink> */}
                        <BoxLink to='/manage/post'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faFile} />
                                </Box>
                                <Box as='span'>Posts</Box>
                            </BoxItem>
                        </BoxLink>
                        {/* <BoxLink to='/manage/my-follower'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faUsers} />
                                </Box>
                                <Box as='span'>My Followers</Box>
                            </BoxItem>
                        </BoxLink> */}
                        <BoxLink to='/manage/settings'>
                            <BoxItem>
                                <Box width='10%' marginRight='0.5em'>
                                    <Icons icon={faUser} />
                                </Box>
                                <Box as='span'>Account Settings</Box>
                            </BoxItem>
                        </BoxLink>
                        {/* <BoxLink to='/support/following'>
                            <BoxFooter
                                as='div'
                                marginTop='3em'
                                hoverBackgroundColor={colors.darkGreen}
                                backgroundColor={colors.green}
                            >
                                <Box as='span'>Menu Supporter</Box>
                            </BoxFooter>
                        </BoxLink> */}
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

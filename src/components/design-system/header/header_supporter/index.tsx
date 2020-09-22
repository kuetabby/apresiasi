import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Heading, Avatar, Box, Button } from "@chakra-ui/core"
import { useLocation } from "react-router-dom"

import { HeaderMainDashboard } from "./styles"
import { NavMain } from "../styles"
import { mediaQueries, colors, shadows } from "components/utils/variables"

import { SearchNav } from "./header_search"
import { NotificationNav } from "./header_notification"
import { DrawerNav } from "./header_drawer"

const BoxWrapper = styled(Box)`
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 15px;

    ${mediaQueries.smMax} {
        justify-content: flex-end;
    }
`

const BoxUser = styled(Box)`
    text-align: left;
    flex-direction: column;
    height: 1em;
    margin-top: 5px;
    margin-left: 10px;
    font-size: 0.9em;
    font-weight: 600;
    color: ${colors.darkGrey};

    ${mediaQueries.smMax} {
        display: none;
    }
`

const BoxAvatar = styled(Box)`
    width: 100%;
    // margin-right: 30px;
    text-align: center;

    // ${mediaQueries.smMax} {
    //     margin-right: 10px;
    // }
`

const BoxButton = styled(Button)`
    border: none;
    border-radius: 0.25em;
    color: ${colors.darkGrey};
    background: ${colors.white};
    font-family: kingthings;
    padding: 7px 20px;
    cursor: pointer;
    height: 100%;
    box-shadow: ${shadows.single};

    &:hover {
        background: ${colors.red};
        color: ${colors.white};
    }
`

export const HeaderSupport: React.FC = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const location = useLocation()

    const matchLocation = location.pathname
        .split("/support/")
        .join("")
        .split("-")
        .join(" ")
        .toLocaleUpperCase()

    useEffect(() => {
        const handleResize = (): void => {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return (): void => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <HeaderMainDashboard>
            <NavMain width='100%'>
                <DrawerNav />
                <Heading as='h2' size='lg' color={colors.red}>
                    Apresiasi
                </Heading>
                <BoxWrapper d='flex'>
                    {width > 672 ? (
                        <>
                            <Box as='div' textAlign='center' marginLeft='10px'>
                                <BoxButton>View Page</BoxButton>
                            </Box>
                            <Box as='h4' color={colors.red} textAlign='center'>
                                {matchLocation}
                            </Box>
                        </>
                    ) : null}
                    <Box d='flex' alignItems='center'>
                        <SearchNav />
                        <NotificationNav />
                        <BoxAvatar d='flex'>
                            <Avatar size='md' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                            <BoxUser d='flex'>
                                <span>Dan Abramov</span>
                                <span>Creator</span>
                            </BoxUser>
                        </BoxAvatar>
                    </Box>
                </BoxWrapper>
            </NavMain>
        </HeaderMainDashboard>
    )
}

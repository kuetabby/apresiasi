import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Heading, Avatar, Box, Button, Spinner } from "@chakra-ui/core"
import { useLocation, NavLink } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"

import { HeaderMainDashboard } from "./styles"
import { NavMain } from "../styles"
import { mediaQueries, colors, shadows } from "components/utils/variables"

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
    text-align: center;
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

const GET_PROFILE = gql`
    {
        getUser {
            id
            name
            profile_img
        }
    }
`

export const HeaderDashboard: React.FC = () => {
    const { loading, error, data } = useQuery(GET_PROFILE)
    const [width, setWidth] = useState(window.innerWidth)
    const location = useLocation()

    const matchLocation = location.pathname
        .split("/manage/")
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
                <NavLink to='/' style={{ textDecoration: "none" }}>
                    <Heading as='h2' size='lg' color={colors.red}>
                        Apresiasi
                    </Heading>
                </NavLink>
                <BoxWrapper d='flex'>
                    {width > 672 ? (
                        <>
                            <Box as='div' textAlign='center' marginLeft='10px'>
                                <NavLink to={`/user/${data && data.getUser.id}`} style={{ textDecoration: "none" }}>
                                    <BoxButton isDisabled={loading}>View Page</BoxButton>
                                </NavLink>
                            </Box>
                            <Box as='h4' color={colors.red} textAlign='center'>
                                {matchLocation}
                            </Box>
                        </>
                    ) : null}
                    <Box d='flex' alignItems='center'>
                        {error ? <p>Something went wrong...</p> : null}
                        {loading ? (
                            <Spinner />
                        ) : (
                            <BoxAvatar d='flex'>
                                <Avatar
                                    size='md'
                                    name={data && data.getUser.name}
                                    src={data && data.getUser.profile_img}
                                />
                                <BoxUser d='flex'>
                                    <span>{data && data.getUser.name}</span>
                                    <span>Creator</span>
                                </BoxUser>
                            </BoxAvatar>
                        )}
                    </Box>
                </BoxWrapper>
            </NavMain>
        </HeaderMainDashboard>
    )
}

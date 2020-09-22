import React from "react"
import { Box } from "@chakra-ui/core"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"

const BoxWrapper = styled(Box)`
    margin: 10em 0px;
    text-align: center;
`

interface Props {}

export const NotFoundPage: React.FC<Props> = () => {
    return (
        <BoxWrapper as='div'>
            <h1 className='NotFound-title'>Oops! Page not found</h1>

            <Link to='/'>Go to homepage</Link>
        </BoxWrapper>
    )
}

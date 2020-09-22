import styled from "@emotion/styled"
import { Box } from "@chakra-ui/core"
import { mediaQueries, colors } from "components/utils/variables"

export const Root = styled(Box)`
    max-width: 1440px;
    margin: 0 auto;
    padding-top: 50px;
    height: 100vh;
`
export const BoxCard = styled(Box)`
max-width: 100%:
box-sizing: border-box;
text-decoration: none;
border: 1px solid ${colors.darkGrey};
border-radius: 10px;
margin: 10px;
background-color: ${colors.grey};

${mediaQueries.mdMax} {
    width: auto;
    margin: 10px;
    }
`

export const TextCard = styled(Box)`
    padding: 10px 40px;
    text-align: left;
    font-size: 1em;
`

export const ImgCard = styled(Box)`
    height: 200px;
    margin: 5px 40px;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
`

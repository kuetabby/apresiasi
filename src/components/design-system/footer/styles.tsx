import styled from "@emotion/styled"
import { Box } from "@chakra-ui/core"
import { colors, mediaQueries } from "components/utils/variables"

export const WrapperFooter = styled.footer`
    padding: 25px 0;
    text-align: center;
    background: ${colors.pink};
    color: ${colors.red};
`

// export const FooterIcons = styled(FontAwesomeIcon)`
//     font-size: 40px;
//     color: red;
// `

export const Title = styled(Box)`
    font-size: 1.5em;
    font-weight: 700;
    margin-bottom: 20px;
`

interface ContentProps {
    justify?: string
}

export const RowContent = styled(Box)<ContentProps>`
    display: flex;
    justify-content: ${props => props.justify};
    flex: 0 1 auto;
    padding: 0 20px;

    ${mediaQueries.smMax} {
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    ${mediaQueries.lg} {
        padding: 0 100px;
    }
`

// export const RowFooter = styled(Box)`
//     display: flex;
//     justify-content: space-between;
//     flex-wrap: wrap;
//     padding: 5px 80px;
//     margin-top: 80px;
//     text-align: center;
//     max-width: 1440px;
// `

export const SubContent = styled(Box)`
    width: 33%;
    flex: 0 1 auto;
    text-align: left;
    margin: 10px;
`

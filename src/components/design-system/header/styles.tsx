import styled from "@emotion/styled"
import { Button } from "@chakra-ui/core"

import { colors } from "components/utils/variables"

export const SearchButton = styled(Button)`
    border: 1px solid;
    border-color: ${colors.green};
    color: white;
    background: #38c516;
    cursor: pointer;

    &:hover {
        background: green;
    }
`

interface NavMainProps {
    width?: string
}

export const NavMain = styled.nav<NavMainProps>`
    display: flex;
    margin: 0 auto;
    max-width: ${props => (props.width ? props.width : "1440px")};
    z-index: 2;
    align-items: center;
    height: 60px;
    justify-content: space-between;
    position: relative;
`

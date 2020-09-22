/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from "@emotion/styled"

import { colors, shadows } from "components/utils/variables"
import { Box } from "@chakra-ui/core"

export const HeaderMainDashboard = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;
    background-color: ${colors.white};
    color: ${colors.darkGrey};
    box-shadow: ${shadows.single};
`

export const BoxIcon = styled(Box)`
    color: ${colors.darkGrey};
    cursor: pointer;
    font-size: 24px;

    &:hover {
        color: ${colors.red};
    }
`

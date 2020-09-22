import React from "react"
import styled from "@emotion/styled"
import {
    Box,
    Popover,
    PopoverHeader,
    PopoverTrigger,
    PopoverContent,
    // PopoverArrow,
    PopoverBody
} from "@chakra-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { BoxIcon } from "./styles"
import { colors } from "components/utils/variables"

const PopHeader = styled(PopoverHeader)`
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    border-bottom: 1px solid;
`

const PopBody = styled(PopoverBody)`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    color: ${colors.red};
`

// eslint-disable-next-line react/prop-types
export const NotificationNav: React.FC = () => {
    return (
        <Popover placement='bottom'>
            <PopoverTrigger>
                <BoxIcon as='div' marginRight='20px'>
                    <FontAwesomeIcon icon={faBell} />
                </BoxIcon>
            </PopoverTrigger>
            <PopoverContent zIndex={3} outline='none'>
                {/* <PopoverArrow /> */}
                <PopHeader bg={colors.grey}>
                    <Box as='div' color={colors.red}>
                        Notifications
                    </Box>
                    <Box as='div' color={colors.blue}>
                        Mark All as Read
                    </Box>
                </PopHeader>
                <PopBody>Daftar kosong</PopBody>
            </PopoverContent>
        </Popover>
    )
}

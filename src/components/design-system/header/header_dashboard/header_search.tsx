import React, { useRef } from "react"
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Input } from "@chakra-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import { SearchButton } from "../styles"
import { BoxIcon } from "./styles"
import { colors } from "components/utils/variables"

// eslint-disable-next-line react/prop-types
export const SearchNav: React.FC = () => {
    const searchFocusRef = useRef(null)
    return (
        <Popover placement='bottom' initialFocusRef={searchFocusRef}>
            <PopoverTrigger>
                <BoxIcon as='div' marginRight='20px'>
                    <FontAwesomeIcon icon={faSearch} />
                </BoxIcon>
            </PopoverTrigger>
            <PopoverContent zIndex={3} bg={colors.red}>
                <PopoverArrow />
                <PopoverBody display='flex' justifyContent='space-evenly'>
                    <Input
                        ref={searchFocusRef}
                        marginRight='5px'
                        height='30px'
                        borderColor='white'
                        placeholder='Search Kreator'
                    />
                    <SearchButton height='35px' width='20px'>
                        <FontAwesomeIcon icon={faSearch} />
                    </SearchButton>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

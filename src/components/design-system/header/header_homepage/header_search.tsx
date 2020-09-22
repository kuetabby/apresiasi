import React from "react"
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Input } from "@chakra-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import { NavIcon } from "./styles"
import { SearchButton } from "../styles"

interface Props {
    openBar: boolean
}

// eslint-disable-next-line react/prop-types
export const SearchNav: React.FC<Props> = ({ openBar }) => {
    return (
        <Popover placement='bottom'>
            <PopoverTrigger>
                <span>
                    <NavIcon icon={faSearch} open={openBar} />
                </span>
            </PopoverTrigger>
            <PopoverContent zIndex={3} bg='#0096ff'>
                <PopoverArrow />
                <PopoverBody display='flex' justifyContent='space-evenly'>
                    <Input marginRight='5px' height='30px' borderColor='white' placeholder='Search Kreator' />
                    <SearchButton height='35px' width='20px'>
                        <FontAwesomeIcon icon={faSearch} />
                    </SearchButton>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

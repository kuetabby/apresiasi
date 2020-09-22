import React from "react"
import styled from "@emotion/styled"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    useDisclosure
} from "@chakra-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import { ButtonSearch } from "./styles"
import { colors } from "components/utils/variables"

interface Props {}

const IconWrapper = styled.span`
    margin-right: 10px;
`

const HeadContainer = styled(ModalHeader)`
    text-align: center;
    background: #be1e2d;
    border-color: #be1e2d;
    color: white;
    height: 100%;
`

const InputText = styled.input`
    width: 100%;
    height: 3em;
    font-size: 1em;
    outline: none;
    border: 1px solid;
    border-color: ${colors.grey};
    border-radius: 0.5em;
`

const FooterButton = styled(Button)`
    text-align: center;
    color: white;
    border-color: #0096ff;
    width: 100%;
    cursor: pointer;
`

export const SearchComponent: React.FC<Props> = () => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    return (
        <React.Fragment>
            <ButtonSearch backgroundColor={colors.blue} variantColor='blue' onClick={onOpen}>
                <IconWrapper>
                    <FontAwesomeIcon icon={faSearch} />
                </IconWrapper>
                Pencarian
            </ButtonSearch>
            <Modal isOpen={isOpen} size='xl' isCentered onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <HeadContainer>Pencarian</HeadContainer>
                    <ModalCloseButton
                        cursor='pointer'
                        backgroundColor='#be1e2d'
                        borderColor='#be1e2d'
                        borderRadius='50px'
                        color='white'
                    />
                    <ModalBody>
                        <InputText placeholder='Ketik kata kunci di sini' />
                    </ModalBody>

                    <ModalFooter>
                        <FooterButton backgroundColor={colors.blue} variantColor='blue'>
                            Search
                        </FooterButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    )
}

import * as React from "react"
import {
    Button,
    Box,
    FormControl,
    FormLabel,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Textarea,
    useDisclosure
} from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"

interface ButtonEditProps {
    notFull?: boolean
}

const HeadContainer = styled(ModalHeader)`
    text-align: center;
    background: #be1e2d;
    border-color: #be1e2d;
    color: white;
    height: 100%;
`

const BodyContainer = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: ${colors.grey};
`

const FooterButton = styled(Button)`
    text-align: center;
    color: white;
    border-color: #0096ff;
    width: 100%;
    cursor: pointer;
`

const ButtonEdit = styled(Button)<ButtonEditProps>`
    width:  ${props => (props.notFull ? "auto" : "100%;")}
    height: 30px;
    background-color: ${colors.yellow};
    border: none;
    border-radius: 30px;
    color: ${colors.white};
    margin: 1em auto;
    cursor: pointer;

    &:hover {
        background-color: orange;
    }
`

const BoxFlex = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    width: 100%;
`

const BoxLabel = styled(FormLabel)`
    text-align: left;
    width: 30%;
`

interface Props {}

export const SummaryEdit: React.FC<Props> = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
        <React.Fragment>
            <ButtonEdit onClick={onOpen}>Edit Summary</ButtonEdit>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Edit Summary</HeadContainer>
                        <ModalCloseButton
                            cursor='pointer'
                            backgroundColor='#be1e2d'
                            borderColor='#be1e2d'
                            borderRadius='50px'
                            color='white'
                        />
                        <ModalBody>
                            <BodyContainer>
                                <BoxFlex>
                                    <BoxLabel htmlFor='summary'>Summary</BoxLabel>
                                    <Textarea
                                        id='summary'
                                        borderColor='#d2c7c7'
                                        resize='vertical'
                                        placeholder='summary'
                                    />
                                </BoxFlex>
                            </BodyContainer>
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton variantColor='blue'>Simpan</FooterButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
        </React.Fragment>
    )
}

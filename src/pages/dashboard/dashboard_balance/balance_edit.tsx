/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Fragment } from "react"
import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    // Radio,
    // RadioGroup,
    useDisclosure
} from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors, shadows } from "components/utils/variables"

import { BoxFormControl, BoxForm, BoxSelect, BoxInput } from "./styles"

const HeadContainer = styled(ModalHeader)`
    text-align: center;
    background: #be1e2d;
    border-color: #be1e2d;
    color: white;
    height: 100%;
`

const FooterButton = styled(Button)`
    text-align: center;
    color: white;
    border-color: ${colors.green};
    width: 100%;
    cursor: pointer;
`

interface ButtonProps {
    hoverBackground?: string
}

const ButtonBalance = styled(Button)<ButtonProps>`
    border-radius: 0.25em;
    border: 1px solid;
    cursor: pointer;
    padding: 7px 20px;
    background-color: ${colors.white};

    &:hover {
        background-color: ${props => props.hoverBackground};
        color: ${colors.white};
        border: none;
    }
`

export const BalanceEdit: React.FC = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <Fragment>
            <ButtonBalance
                borderColor={colors.green}
                boxShadow={shadows.singleGreen}
                color={colors.green}
                hoverBackground={colors.green}
                onClick={onOpen}
            >
                Edit
            </ButtonBalance>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Bank Details</HeadContainer>
                        <ModalCloseButton
                            cursor='pointer'
                            backgroundColor='#be1e2d'
                            borderColor='#be1e2d'
                            borderRadius='50px'
                            color='white'
                        />
                        <ModalBody>
                            <BoxFormControl d='flex'>
                                <BoxForm>
                                    <FormLabel htmlFor='bank'>Bank</FormLabel>
                                    <BoxSelect id='bank'>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </BoxSelect>
                                    <FormLabel htmlFor='owner'>Nama Pemilik</FormLabel>
                                    <BoxInput id='owner' placeholder='owner' />
                                    <FormLabel htmlFor='rekening'>Nomor Rekening</FormLabel>
                                    <BoxInput id='rekening' placeholder='rekening' />
                                </BoxForm>
                            </BoxFormControl>
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton variantColor='green'>Simpan</FooterButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
        </Fragment>
    )
}

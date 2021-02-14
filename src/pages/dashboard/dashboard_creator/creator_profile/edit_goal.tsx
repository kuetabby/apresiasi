/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
import React from "react"
import {
    Button,
    Box,
    Input,
    FormControl,
    FormLabel,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Textarea
} from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"

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

const BoxInput = styled(Input)`
    border-color: ${colors.darkGrey};
    width: 100%;
    margin-bottom: 1.5em;
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

const BoxAt = styled(Box)`
    display: flex;
    align-items: center;
    flex-basis: auto;
    border: 1px solid;
    border-radius: 0.25em;
    border-color: ${colors.grey};
    padding: 1px 0.5em;
    height: 2.5rem;
    background-color: ${colors.darkGrey};
`

interface Props {
    isOpen: boolean
    isLoading: boolean
    onClose: () => void
    onChangeState: (e: React.ChangeEvent<HTMLInputElement>) => void
    onUpdateUser: () => void
    judul: string
    description: string
    target_dana: string
}

export const GoalEdit: React.FC<Props> = ({
    isOpen,
    isLoading,
    onClose,
    onChangeState,
    onUpdateUser,
    judul,
    description,
    target_dana
}) => {
    return (
        <React.Fragment>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Edit Goal</HeadContainer>
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
                                    <BoxLabel htmlFor='judul'>Judul</BoxLabel>
                                    <BoxInput
                                        id='judul'
                                        value={judul || ""}
                                        onChange={onChangeState}
                                        placeholder='Nama Judul'
                                    />
                                </BoxFlex>
                                <BoxFlex>
                                    <BoxLabel htmlFor='description'>Description</BoxLabel>
                                    <Textarea
                                        id='description'
                                        value={description || ""}
                                        onChange={onChangeState}
                                        borderColor='#d2c7c7'
                                        resize='vertical'
                                        placeholder='Description'
                                    />
                                </BoxFlex>
                                <BoxFlex>
                                    <BoxLabel htmlFor='target_dana'>Target Dana</BoxLabel>
                                    <Box d='flex' justifyContent='space-between' width='100%'>
                                        <BoxAt>Rp</BoxAt>
                                        <BoxInput
                                            id='target_dana'
                                            value={target_dana || ""}
                                            onChange={onChangeState}
                                            placeholder='Target Dana'
                                        />
                                    </Box>
                                </BoxFlex>
                            </BodyContainer>
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton variantColor='blue' onClick={onUpdateUser} isDisabled={isLoading}>
                                Simpan
                            </FooterButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
        </React.Fragment>
    )
}

/* eslint-disable @typescript-eslint/camelcase */
import React from "react"
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
    Select
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

interface Props {
    isOpen: boolean
    isLoadingUpdate: boolean
    onClose: () => void
    onUpdateUser: () => void
    onChangeState: (e: React.ChangeEvent<HTMLSelectElement>) => void
    page_active: string
}

export const SettingsEdit: React.FC<Props> = ({
    isOpen,
    onClose,
    onUpdateUser,
    isLoadingUpdate,
    onChangeState,
    page_active
}) => {
    return (
        <React.Fragment>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Page Settings</HeadContainer>
                        <ModalCloseButton
                            cursor='pointer'
                            backgroundColor='#be1e2d'
                            borderColor='#be1e2d'
                            borderRadius='50px'
                            color='white'
                        />
                        <ModalBody>
                            <BodyContainer>
                                {/* <BoxFlex>
                                    <BoxLabel htmlFor='page'>Page ID</BoxLabel>
                                    <Box d='flex' justifyContent='space-between' width='100%'>
                                        <BoxAt>https://apresiasi.id/user/</BoxAt>
                                        <BoxInput id='page' value={page} onChange={onChangeState} placeholder='page' />
                                    </Box>
                                </BoxFlex> */}
                                <BoxFlex>
                                    <BoxLabel htmlFor='creator'>Page Active</BoxLabel>
                                    <Select
                                        placeholder='Select Status Page'
                                        borderColor='#d2c7c7'
                                        id='creator'
                                        onChange={onChangeState}
                                        value={page_active || ""}
                                    >
                                        <option value='active'>Active</option>
                                        <option value='inactive'>Inactive</option>
                                    </Select>
                                </BoxFlex>
                            </BodyContainer>
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton
                                variantColor='blue'
                                onClick={onUpdateUser}
                                isDisabled={!page_active || isLoadingUpdate}
                            >
                                Simpan
                            </FooterButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
        </React.Fragment>
    )
}

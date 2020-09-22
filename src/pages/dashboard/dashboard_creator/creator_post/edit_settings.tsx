/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from "react"
import { gql, useMutation } from "@apollo/client"
import {
    Button,
    Box,
    // Input,
    FormControl,
    FormLabel,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Select,
    useDisclosure,
    useToast
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

// const BoxInput = styled(Input)`
//     border-color: ${colors.darkGrey};
//     width: 100%;
//     margin-bottom: 1.5em;
// `

const ButtonEdit = styled(Button)<ButtonEditProps>`
    background-color: ${colors.green};
    border: none;
    border-radius: 0.25em;
    width: 45%;
    color: ${colors.white};
    margin: 1em auto;
    cursor: pointer;
    font-size: 0.9em;

    &:hover {
        background-color: ${colors.darkGreen};
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

// const BoxAt = styled(Box)`
//     display: flex;
//     align-items: center;
//     flex-basis: auto;
//     border: 1px solid;
//     border-radius: 0.25em;
//     border-color: ${colors.grey};
//     padding: 1px 0.5em;
//     height: 2.5rem;
//     background-color: ${colors.darkGrey};
// `

const UPDATE_PROFILE = gql`
    mutation UpdateProfile($is_page_active: String!) {
        updateUser(data: { is_page_active: $is_page_active }) {
            is_page_active
        }
    }
`

interface Props {
    data: any
}

// is_page_active

export const SettingsEdit: React.FC<Props> = ({ data }) => {
    const toast = useToast()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [UpdateUser, { loading }] = useMutation(UPDATE_PROFILE, {
        onError: err => {
            console.log(err.stack)
        },
        onCompleted: () => {
            onClose()
            toast({
                title: "Page Updated!",
                position: "top",
                description: "Mohon Refresh Page",
                status: "success",
                duration: 3000
            })
        }
    })

    const [page_active, setState] = useState("")

    useEffect(() => {
        if (data) {
            setState(data.is_page_active)
        }
    }, [data])

    const onChangeState = (e: any) => {
        const { value } = e.target

        setState(value)
    }

    const onUpdateUser = () => {
        UpdateUser({
            variables: {
                is_page_active: page_active
            }
        })
    }

    return (
        <React.Fragment>
            <ButtonEdit onClick={onOpen}>Page Settings</ButtonEdit>
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
                                isDisabled={!page_active || loading}
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

/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from "react"
import { gql, useMutation } from "@apollo/client"
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
    // Radio,
    // RadioGroup,
    Textarea,
    useToast,
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

const BoxInput = styled(Input)`
    border-color: ${colors.darkGrey};
    width: 100%;
    margin-bottom: 1.5em;
`

// const BoxRadio = styled(RadioGroup)`
//     width: 100%;
//     margin-bottom: 1.5em;
// `

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

const UPDATE_PROFILE = gql`
    mutation UpdateProfile($judul: String!, $description: String!, $target_dana: String!) {
        updateUser(data: { judul: $judul, description: $description, target_dana: $target_dana }) {
            description
            judul
            target_dana
        }
    }
`

interface Props {
    data: any
}

const initialState = {
    judul: "",
    description: "",
    target_dana: ""
}

export const GoalEdit: React.FC<Props> = ({ data }) => {
    const toast = useToast()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [UpdateUser, { loading }] = useMutation(UPDATE_PROFILE, {
        onError: err => {
            console.log(err.stack)
        },
        onCompleted: () => {
            onClose()
            toast({
                title: "Goal Updated!",
                position: "top",
                description: "Mohon Refresh Page",
                status: "success",
                duration: 3000
            })
        }
    })

    const [{ description, judul, target_dana }, setState] = useState(initialState)

    useEffect(() => {
        if (data) {
            setState(data)
        }
    }, [data])

    const onChangeState = (e: any) => {
        const { id, value } = e.target

        setState(state => ({ ...state, [id]: value }))
    }

    const onUpdateUser = () => {
        UpdateUser({
            variables: {
                description,
                judul,
                target_dana
            }
        })
    }

    return (
        <React.Fragment>
            <ButtonEdit onClick={onOpen}>Edit Goal</ButtonEdit>
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
                                {/* <BoxFlex>
                                    <BoxLabel htmlFor='pengaturan'>Pengaturan</BoxLabel>
                                    <BoxRadio
                                    // onChange={e => setValue(e.target.value)} value={value}
                                    >
                                        <Radio variantColor='red' borderColor={colors.darkGrey} value='1'>
                                            Tampilkan target dana pada publik
                                        </Radio>
                                        <Radio variantColor='red' borderColor={colors.darkGrey} value='2'>
                                            Tampilkan target dana hanya pada Supporter
                                        </Radio>
                                        <Radio variantColor='red' borderColor={colors.darkGrey} value='3'>
                                            Sembunyikan target dana
                                        </Radio>
                                    </BoxRadio>
                                </BoxFlex> */}
                            </BodyContainer>
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton variantColor='blue' onClick={onUpdateUser} isDisabled={loading}>
                                Simpan
                            </FooterButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
        </React.Fragment>
    )
}

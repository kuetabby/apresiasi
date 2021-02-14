/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react"
import {
    Avatar,
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
    Spinner
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
    align-items: center;
    margin: 10px;
    justify-content: space-between;
    width: 100%;
`

const BoxLabel = styled(FormLabel)`
    text-align: left;
    width: 30%;
`

const BoxImg = styled(Box)`
    display: flex;
    align-items: center;
    flex-basis: auto;
    padding: 1px 0.5em;
    background: ${colors.white};
    border: 1px solid;
    border-radius: 0.25em;
    border-color: ${colors.grey};
    height: 2.5rem;
    margin-right: 1em;
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
    isLoadingImage: boolean
    isLoading: boolean
    onClose: () => void
    onUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeState: (e: React.ChangeEvent<HTMLInputElement>) => void
    onUpdateUser: () => void
    name: string
    image: string
    username: string
}

export const ProfileEdit: React.FC<Props> = ({
    isOpen,
    isLoadingImage,
    isLoading,
    onClose,
    onUploadImage,
    onChangeState,
    onUpdateUser,
    name,
    image,
    username
}) => {
    return (
        <React.Fragment>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Edit Profile</HeadContainer>
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
                                    <BoxLabel htmlFor='avatar'>Avatar</BoxLabel>
                                    <Box as='div' d='flex' justifyContent='space-between' width='100%'>
                                        {isLoadingImage ? (
                                            <Spinner />
                                        ) : (
                                            <Fragment>
                                                <BoxImg>
                                                    <Avatar width='40px' height='40px' name={name} src={image} />
                                                </BoxImg>
                                                <BoxInput
                                                    type='file'
                                                    id='avatar'
                                                    onChange={onUploadImage}
                                                    placeholder='avatar'
                                                />
                                            </Fragment>
                                        )}
                                    </Box>
                                </BoxFlex>
                                <BoxFlex>
                                    <BoxLabel htmlFor='name'>Name</BoxLabel>
                                    <BoxInput
                                        id='name'
                                        value={name || ""}
                                        onChange={onChangeState}
                                        placeholder='name'
                                    />
                                </BoxFlex>
                                <BoxFlex>
                                    <BoxLabel htmlFor='username'>Username</BoxLabel>
                                    <Box d='flex' justifyContent='space-between' width='100%'>
                                        <BoxAt>@</BoxAt>
                                        <BoxInput
                                            id='username'
                                            value={username || ""}
                                            onChange={onChangeState}
                                            placeholder='username'
                                        />
                                    </Box>
                                </BoxFlex>
                                {/* <BoxFlex>
                                    <BoxLabel htmlFor='occupation'>Occupation</BoxLabel>
                                    <BoxInput id='occupation' placeholder='occupation' />
                                </BoxFlex> */}
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

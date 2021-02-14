/* eslint-disable @typescript-eslint/camelcase */
import React, { Fragment } from "react"
import {
    Button,
    Box,
    FormControl,
    FormLabel,
    Input,
    Image,
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

const BoxFlex = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    width: 100%;
`

const BoxInput = styled(Input)`
    border-color: ${colors.darkGrey};
    width: 100%;
    padding: 10px;
    text-align: center;
    margin-bottom: 1em;
`
const BoxQuery = styled(Box)`
    width: 100%;
    height: 500px;
    text-align: center;
    margin-top: 1.5em;
`

const BoxLabel = styled(FormLabel)`
    text-align: left;
    width: 30%;
`

interface Props {
    isOpen: boolean
    isLoadingImage: boolean
    isLoadingUpdate: boolean
    onClose: () => void
    onUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void
    onUpdateUser: () => void
    image: string
}

export const CoverEdit: React.FC<Props> = ({
    isOpen,
    onClose,
    isLoadingImage,
    isLoadingUpdate,
    onUploadImage,
    onUpdateUser,
    image
}) => {
    return (
        <React.Fragment>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Edit Cover</HeadContainer>
                        <ModalCloseButton
                            cursor='pointer'
                            backgroundColor='#be1e2d'
                            borderColor='#be1e2d'
                            borderRadius='50px'
                            color='white'
                        />
                        <ModalBody>
                            <BodyContainer>
                                {isLoadingImage ? (
                                    <BoxQuery>
                                        <Spinner />
                                    </BoxQuery>
                                ) : (
                                    <Fragment>
                                        <BoxFlex>
                                            <Image width='100%' height='270px' alt='cover_img' src={image} />
                                        </BoxFlex>
                                        <BoxFlex>
                                            <BoxLabel htmlFor='cover'>Cover</BoxLabel>
                                            <BoxInput
                                                id='cover'
                                                placeholder='cover'
                                                type='file'
                                                onChange={onUploadImage}
                                            />
                                        </BoxFlex>
                                    </Fragment>
                                )}
                            </BodyContainer>
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton variantColor='blue' onClick={onUpdateUser} isDisabled={isLoadingUpdate}>
                                Simpan
                            </FooterButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
        </React.Fragment>
    )
}

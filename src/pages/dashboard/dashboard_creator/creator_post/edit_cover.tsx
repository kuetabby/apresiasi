/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState, Fragment } from "react"
import { gql, useMutation } from "@apollo/client"
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
    Spinner,
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

const UPDATE_PROFILE = gql`
    mutation UpdateProfile($cover_img: String!) {
        updateUser(data: { cover_img: $cover_img }) {
            cover_img
        }
    }
`

interface Props {
    data: any
}

export const CoverEdit: React.FC<Props> = ({ data }) => {
    const toast = useToast()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [UpdateUser, { loading }] = useMutation(UPDATE_PROFILE, {
        onCompleted: () => {
            onClose()
            toast({
                title: "Cover Updated!",
                position: "top",
                description: "Mohon Refresh Page",
                status: "success",
                duration: 3000
            })
        }
    })

    const [image, setImage] = useState("")
    const [loadingImage, setLoadingImage] = useState(false)

    useEffect(() => {
        if (data) {
            setImage(data.cover_img)
        }
    }, [data])

    const onUploadImage = async (e: any) => {
        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "rabbit_images")
        setLoadingImage(true)

        const res = await fetch("https://api.cloudinary.com/v1_1/dwppcshmi/image/upload", {
            method: "post",
            body: data
        })

        const file = await res.json()
        setImage(file.secure_url)
        setLoadingImage(false)
    }

    const onUpdateUser = () => {
        UpdateUser({
            variables: {
                cover_img: image
            }
        })
    }

    return (
        <React.Fragment>
            <ButtonEdit onClick={onOpen} notFull>
                Edit Cover
            </ButtonEdit>
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
                                {loadingImage ? (
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
